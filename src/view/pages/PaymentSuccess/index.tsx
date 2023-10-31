// Core
import React, { FC, useEffect } from 'react';

// Bus
import { useCart } from '@/bus/cart';

// Components
import { ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const PaymentSuccess: FC<PropTypes> = () => {
    const { resetCart } = useCart();

    useEffect(() => {
        resetCart();
    }, []);

    return (
        <div>
            Page: PaymentSuccess
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <PaymentSuccess />
    </ErrorBoundary>
);
