import Link from 'next/link';
import React, { useContext } from 'react';
import CopyButton from './copy_button/CopyButton';
import { useConfig } from '@/context/config';
import { useRouter } from 'next/router';
import { shortenString } from './utils';
import { NETWORK_SCANNER_MAP } from './constants';

function Token({ icon, text, copyIcon, type }: { icon?: string; text: string; copyIcon?: string; type?: string }) {
    const { selectedNetwork } = useConfig();

    return (
        <div className="flex items-center gap-2.5">
            {icon && <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />}
            <Link href={getHrefLink(type, text, selectedNetwork)} target={getTarget(type)} className="text-blue-200">
                {shortenString(text)}
            </Link>
            <CopyButton text={text} copyIcon={copyIcon} />
        </div>
    );
}

export default Token;

function getHrefLink(type: string | undefined, text: string, network: string) {
    if (type == undefined) return '#';

    if (type == 'userOp') {
        return {
            pathname: `/userOpHash/${text}`,
            search: network ? `?network=${network}` : '',
        };
    } else if (type == 'address') {
        return {
            pathname: `/account/${text}`,
            search: network ? `?network=${network}` : '',
        };
    } else if (type == 'bundle') {
        return NETWORK_SCANNER_MAP[network] + text;
    } else {
        return '#';
    }
}

function getTarget(type: string | undefined) {
    // console.log(type)
    if (type == undefined) return '_self';

    // if (type == 'address') {
    //     return '_blank';
    // }
    if (type == 'bundle') {
        return '_blank';
    } else {
        return '_self';
    }
}
