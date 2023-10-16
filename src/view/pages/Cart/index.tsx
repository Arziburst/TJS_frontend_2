// Core
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Books
import { BOOK } from '@/view/routes/book';

// Hooks
import { useWindowWidth } from '@/tools/hooks';

// Bus
import { useCart } from '@/bus/cart';
import { useProducts } from '@/bus/products';

// Components
import { ErrorBoundary, CartDetails } from '../../components';

// Elements
import { Button } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

const Cart: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const [ width ] = useWindowWidth();

    const { fetchProducts } = useProducts();
    const { cart } = useCart();

    // Handlers
    const onClickContinueToCheckout = () => {
        navigate(BOOK.ORDER_DETAILS);
    };

    useEffect(() => {
        if (cart) {
            fetchProducts(cart);
        }
    }, [ cart ]);

    return (
        <div className = 'sb:flex'>
            <h1>cart</h1>
            {width < SCREENS_NUMBER.SB && (
                <Button
                    className = 'capitalize'
                    onClick = { onClickContinueToCheckout }>
                    continue to checkout
                </Button>
            )}
            {width > SCREENS_NUMBER.SB && (
                <CartDetails />
            )}
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Cart />
    </ErrorBoundary>
);
