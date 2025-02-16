import { getNetworkParam } from '@/components/common/utils';
import Layout from '@/components/globals/Layout';
import { useConfig } from '@/context/config';
import RecentPaymentMaster from '@/views/recentPaymentMaster/recentPaymentMaster';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

function RecentPayment() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <RecentPaymentMaster slug={slug} />
        </div>
    );
}

export default RecentPayment;

RecentPayment.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
