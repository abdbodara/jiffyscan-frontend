import Chip, { ChipProps } from "@/components/common/chip/Chip";
import React, { useEffect, useState } from "react";
import Token from "@/components/common/Token";
import Caption, { CaptionProps } from "./Caption";
import ScrollContainer from "react-indiana-drag-scroll";
import useWidth from "@/hooks/useWidth";
import { getCurrencySymbol } from "../utils";
import Skeleton from "@/components/Skeleton";

export interface tableDataT {
  // caption: CaptionProps;
  // columns: {
  //   name: string;
  //   sort: boolean;
  // }[];
  rows: {
    token?: {
      text: string;
      // icon: string;
      // type: string;
    };
    ago?: string;
    sender?: string;
    target?: string;
    fee?: fee;
    userOps?: string;
  }[];
}

export interface fee {
  value: string;
  gas: {
    children: string;
    color: string;
  };
}

export const getFee = (amount: number, network: string): fee => {
  let gasFee:number = amount
  let fee: fee= {
      value: '0',
      gas: {
          children: getCurrencySymbol(gasFee, network),
          color: "success"
      }
  }
  if (gasFee > 10**13) {
      fee.value = (gasFee / 10**18).toFixed(4).toString()
  } else if (gasFee > 10**6) {
      fee.value = (gasFee / 10**9).toFixed(4).toString()
  } else {
      fee.value = gasFee?.toString()
  }
  return fee;
}

function Table(props: tableDataT) {
  const {  rows } = props;
 
  const width = useWidth();
  const [loading, setLoading] = useState(true);
  let columns=[];
  useEffect(() => {
    if (rows) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [rows]);
  let skeletonCards = Array(5).fill(0);
  return (
    <div className="">
      <Caption icon="/images/cube.svg">More than {">"} 1,892,547,662 transactions found</Caption>
      <ScrollContainer>
          {loading ?( skeletonCards.map((index: number) => <Skeleton />)):( 
          <div style={width < 768 ? { minWidth: columns?.length * 160 } : {}}>
            <table className="w-full text-md bg-white shadow-200 border border-dark-100">
                <thead>
                  <tr>
                  <th
                  
                    className={'py-3.5 px-4 border-b border-dark-100 group min-w-[100px]'}
                      >
                        <div
                          // role={sort ? "button" : undefined}
                          className={'flex items-center gap-2.5 group-last:justify-end'}
                        >
                          <span>Hash</span>
                        </div>
                      </th>
                      <th
                  
                    className={'py-3.5 px-4 border-b border-dark-100 group min-w-[100px]'}
                      >
                        <div
                          // role={sort ? "button" : undefined}
                          className={'flex items-center gap-2.5 group-last:justify-end'}
                        >
                          <span>Age</span>
                        </div>
                      </th>
                      <th
                  
                    className={'py-3.5 px-4 border-b border-dark-100 group min-w-[100px]'}
                      >
                        <div
                          // role={sort ? "button" : undefined}
                          className={'flex items-center gap-2.5 group-last:justify-end'}
                        >
                          <span>UserOps</span>
                        </div>
                      </th>
                    {/* {columns.map(({ name, sort }, key) => (
                      <th
                        key={key}
                        className={`py-3.5 px-4 border-b border-dark-100 group ${
                          columns.length <= 3 ? "md:first:wx-[55%]" : ""
                        }`}
                      >
                        <div
                          role={sort ? "button" : undefined}
                          className={`flex items-center gap-2.5 ${
                            columns.length <= 3 ? "group-last:justify-end" : ""
                          }`}
                        >
                          <span>{name}</span>
                          {name === "Age" ?sort && <img src="/images/span.svg" alt="" />:null}
                        </div>
                      </th>
                    ))} */}
                  </tr>
                  
                </thead>
                <tbody>
                {rows.map(({ ago, fee, sender, target, token, userOps }, index) => (
                    <tr
                      key={index}
                      className="[&_td]:border-b [&_td]:border-dark-100 [&_td]:py-3.5 [&_td]:px-4 odd:bg-dark-25 hover:bg-dark-25"
                    >
                      {token && (
                        <td className="">
                          <Token {...token}/>
                        </td>
                      )}
    
                      {ago && (
                        <td className="">
                          <span className="tracking-normal">{ago}</span>
                        </td>
                      )}
                      {userOps && (
                        <td className="">
                          <span className="text-blue-200 text-right block">{userOps}</span>
                        </td>
                      )}
    
                      {sender && (
                        <td className="">
                          <Token text={sender} type="address"/>
                        </td>
                      )}
    
                      {target && (
                        <td className="">
                          <Token text={target} type="address"/>
                        </td>
                      )}
    
                      {fee && (
                        <td className="">
                          <div className="flex items-center justify-end text-rgiht gap-2">
                            <span>{fee.value}</span>
                            <Chip variant="outlined" color={fee.gas.color as ChipProps["color"]}>
                              {fee.gas.children}
                            </Chip>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}  
                </tbody>
              </table>
          </div>
          )}

      </ScrollContainer>
    </div>
  );
}

export default Table;