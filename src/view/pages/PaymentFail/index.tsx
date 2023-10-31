// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Components
import { ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const PaymentFail: FC<PropTypes> = () => {
    return (
        <div>
            Page: PaymentFail
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <PaymentFail />
    </ErrorBoundary>
);
