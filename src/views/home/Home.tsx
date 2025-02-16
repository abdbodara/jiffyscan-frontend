import Button from '@/components/common/Button';
import Table, { tableDataT } from '@/components/common/table/Table';
import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import RecentMetrics from '@/components/globals/recent_metrics/RecentMetrics';
import React, { useState, useEffect } from 'react';
import BundlesTable from './bundles_table.json';
import OperationsTable from './operations_table.json';
import Searchblock from '../../components/globals/searchblock/Searchblock';
import { NETWORK_LIST, NETWORK_ICON_MAP } from '@/components/common/constants';
import { getLatestBundles, getLatestUserOps, Bundle, UserOp } from '@/components/common/apiCalls/jiffyApis';
import { getTimePassed } from '@/components/common/utils';
import { useConfig } from '../../context/config';
import InfoButton from '@/components/common/InfoButton';

function Home() {
    const { selectedNetwork, setSelectedNetwork } = useConfig();
    const [bundlesTable, setBundlesTable] = useState<tableDataT>(BundlesTable as tableDataT);
    const [operationsTable, setOperationsTable] = useState<tableDataT>(OperationsTable as tableDataT);
    const [userOpTableLoading, setUserOpTableLoading] = useState(true);
    const [bundleTableLoading, setBundleTableLoading] = useState(true);
    useEffect(() => {
        refreshBundlesTable(selectedNetwork);
        refreshUserOpsTable(selectedNetwork);
        setTimeout(() => {
            setBundleTableLoading(false);
        }, 2000);
        setTimeout(() => {
            setUserOpTableLoading(false);
        }, 2000);
    }, [selectedNetwork]);

    const refreshBundlesTable = async (network: string) => {
        setBundleTableLoading(true);
        const bundles = await getLatestBundles(network, 5, 0);
        let newRows = [] as tableDataT['rows'];
        bundles.forEach((bundle) => {
            newRows.push({
                token: {
                    text: bundle.transactionHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'bundle',
                },
                ago: getTimePassed(bundle.blockTime),
                userOps: bundle.userOpsLength + ' ops',
            });
        });
        setBundlesTable({ ...bundlesTable, rows: newRows.slice(0, 5) });
        // setTimeout(() => {
        //     setBundleTableLoading(false);
        // }, 3000);
    };

    const refreshUserOpsTable = async (network: string) => {
        setUserOpTableLoading(true);
        const userOps = await getLatestUserOps(network, 5, 0);
        let newRows = [] as tableDataT['rows'];
        userOps.forEach((userOp) => {
            newRows.push({
                token: {
                    text: userOp.userOpHash,
                    icon: NETWORK_ICON_MAP[network],
                    type: 'userOp',
                },
                ago: getTimePassed(userOp.blockTime!),
                sender: userOp.sender,
                target: userOp.target!,
                status: userOp.success!,
            });
        });
        setOperationsTable({ ...operationsTable, rows: newRows.slice(0, 5) });
        // setTimeout(() => {
        //     setUserOpTableLoading(false);
        // }, 3000);
    };

    return (
        <div>
            <Navbar />
            <section className="py-6">
                <div className="container">
                    <h1 className="font-bold text-xl leading-8 md:text-3xl mb-2 md:mb-4">
                        UserOp Explorer for{' '}
                        <a href="https://eips.ethereum.org/EIPS/eip-4337" target="_blank" style={{ textDecoration: 'underline' }}>
                            4337
                        </a>
                    </h1>
                    <div>
                        <Searchblock />
                    </div>
                </div>
            </section>
            <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
            <section className="mb-12">
                <div className="container grid-cols-1 md:grid-cols-2 grid gap-10">
                    <div>
                        <Table
                            {...(bundlesTable as tableDataT)}
                            loading={bundleTableLoading}
                            caption={{
                                children: 'Recent Bundles',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Recent bundles Processed by selected chain',
                            }}
                        />

                        <div className="mt-4">
                            <Button href="/recentBundles">View all bundles</Button>
                        </div>
                    </div>
                    <div>
                        <Table
                            {...(operationsTable as tableDataT)}
                            loading={userOpTableLoading}
                            caption={{
                                children: 'Recent User Operations',
                                icon: '/images/swap-vertical-bold (1).svg',
                                text: 'Recent User Operations Processed by selected chain',
                            }}
                        />
                        <div className="mt-4">
                            <Button href="/recentUserOps">View all User operations</Button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home;
