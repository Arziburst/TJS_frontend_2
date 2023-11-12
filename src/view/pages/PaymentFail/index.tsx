// Core
import React, { FC } from 'react';

// Tools
import { useCustomTranslation } from '@/tools/hooks';

// Components
import { ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const PaymentFail: FC<PropTypes> = () => {
    const { t } = useCustomTranslation();

    return (
        <div className = 'flex justify-center items-center'>
            <h1>
                {t('pages.paymentFail.title')}
            </h1>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <PaymentFail />
    </ErrorBoundary>
);
