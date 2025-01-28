// Core
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Book
import { BOOK } from '@/view/routes/book';

// Hooks
import { useWindowWidth } from '@/tools/hooks';

// Components
import { CartDetails, ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const OrderDetails: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const [width] = useWindowWidth();

    useEffect(() => {
        if (width > SCREENS_NUMBER.SB) {
            navigate(BOOK.CART);
        }
    }, [width]);

    return (
        <div>
            <CartDetails />
        </div>
    );
};

const OrderDetailsWithErrorBoundary: FC = () => (
    <ErrorBoundary>
        <OrderDetails />
    </ErrorBoundary>
);

OrderDetailsWithErrorBoundary.displayName = 'OrderDetailsWithErrorBoundary';

export default OrderDetailsWithErrorBoundary;
