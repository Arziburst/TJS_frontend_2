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
import { useTogglesRedux } from '@/bus/client/toggles';
import { useCart } from '@/bus/cart';
import { useProducts } from '@/bus/products';

// Containers
import { NotData } from '@/view/containers';

// Components
import { ErrorBoundary, CartDetails, CardCart, HorizontalRuleWithTotalPrice } from '../../components';

// Elements
import { Button, TitlePage } from '@/view/elements';

// Types
import { ExtendedProduct } from '@/bus/products/types';
import { cn } from '@/tools/lib/utils';

type PropTypes = {
    /* type props here */
}

const Cart: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const [ width ] = useWindowWidth();

    const { togglesRedux: { isLoadingFetchProduct }} = useTogglesRedux();
    const { products: { products }, fetchProducts } = useProducts();
    const { cart, fetchProductCart, removeProductOfCart } = useCart();

    // Handlers
    const onClickContinueToCheckout = () => {
        navigate(BOOK.ORDER_DETAILS);
    };

    const onClickRemoveHandler = (product: ExtendedProduct) => {
        removeProductOfCart(product._id);
    };

    useEffect(() => {
        if (cart) {
            fetchProducts(cart);
            // fetchProductCart(cart);
        }
    }, [ cart ]);

    return (
        <div>
            {width < SCREENS_NUMBER.SB && (
                <TitlePage>cart</TitlePage>
            )}

            <div className = { `flex flex-col gap-[32px]
                sb:flex-row sb:gap-10
                xl:gap-[100px]` }>

                <div className = 'sb:w-1/2'>
                    <NotData
                        className = { cn(`flex flex-col gap-[18px]
                        sm:flex-row sm:justify-center sm:flex-wrap
                        sb:justify-start`, {
                            'sb:justify-center': isLoadingFetchProduct,
                        }) }
                        isLoading = { isLoadingFetchProduct }
                        textIfNotData = 'Your cart is empty'>
                        {products?.map((product) => (
                            <CardCart
                                alt = { `Image of ${product.title }` }
                                key = { product._id }
                                product = { product }
                                src = { product.images[ 0 ] }
                                variant = 'big'
                                onClickRemove = { onClickRemoveHandler }
                            />
                        ))}
                    </NotData>
                    {products && (
                        <HorizontalRuleWithTotalPrice
                            price = {
                                (products && products.length > 0 && products.map((product) => product.price)
                                    .reduce((accumulator, currentValue) => accumulator + currentValue)) || 0
                            }
                            text = 'your order'
                        />
                    )}
                </div>

                {width < SCREENS_NUMBER.SB && (
                    <Button
                        className = 'capitalize'
                        onClick = { onClickContinueToCheckout }>
                        continue to checkout
                    </Button>
                )}
                {width > SCREENS_NUMBER.SB && (
                    <CartDetails className = 'sb:w-1/2' />
                )}
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Cart />
    </ErrorBoundary>
);
