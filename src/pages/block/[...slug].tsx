import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentAddressActivity from '@/views/recentAddressActivity/recentAddressActivity';
import RecentBlockActivity from '@/views/recentBlockActivity/recentBlockActivity';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentBlock() {
    const router = useRouter();
    const { slug } = router.query;
    const { selectedNetwork, setSelectedNetwork } = useConfig();

    const getNetworkState = (query:any) => {
        console.log(query);
        let network = query['network']?.toString();
        return network != null ? network : 'mainnet';
    };

    useEffect(() => {
        setSelectedNetwork(getNetworkState(router.query));
    }, [])

    return (
        <div>
            <RecentBlockActivity slug={slug} />
        </div>
    );
}

export default RecentBlock;

RecentBlock.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
