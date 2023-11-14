// Core
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Books
import { BOOK } from '@/view/routes/book';

// Hooks
import { useCustomTranslation, useWindowWidth } from '@/tools/hooks';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useCart } from '@/bus/cart';
import { useProducts } from '@/bus/products';

// Containers
import { ContainerForOrdersAndInformationOfPayment, NotData } from '@/view/containers';

// Components
import {
    ErrorBoundary,
    CartDetails,
    HorizontalRuleWithPrice,
    CardItem,
} from '../../components';

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

    const { t } = useCustomTranslation();

    const { togglesRedux: { isLoadingFetchProduct }} = useTogglesRedux();
    const { products: { products }, fetchProducts } = useProducts();
    const { cart, removeProductOfCart } = useCart();

    // Handlers
    const onClickContinueToCheckout = () => {
        navigate(BOOK.ORDER_DETAILS);
    };

    const onClickRemoveProductHandler = (_id: ExtendedProduct['_id']) => {
        removeProductOfCart(_id);
    };

    useEffect(() => {
        if (cart) {
            fetchProducts(cart);
        }
    }, [ cart ]);

    return (
        <div>
            {width < SCREENS_NUMBER.SB && (
                <TitlePage>{t('pages.cart.title')}</TitlePage>
            )}

            <ContainerForOrdersAndInformationOfPayment>
                <div className = 'sb:w-1/2'>
                    <NotData
                        className = { cn(`flex flex-col gap-[18px]
                        sm:flex-row sm:justify-center sm:flex-wrap
                        sb:justify-start`, {
                            'sb:justify-center': isLoadingFetchProduct,
                        }) }
                        isLoading = { isLoadingFetchProduct }
                        t = { t }
                        textIfNotData = { t('pages.cart.textIfNotData') }>
                        {products?.map((product) => (
                            <CardItem
                                _id = { product._id }
                                available = { product.available }
                                firstImage = {{
                                    src: product.images[ 0 ],
                                    alt: t('cards.product.firstAltImageOfCard'),
                                }}
                                key = { product._id }
                                price = { product.price }
                                secondImage = {{
                                    src: product.images[ 1 ],
                                    alt: t('cards.product.secondAltImageOfCard'),
                                }}
                                t = { t }
                                title = { product.title }
                                to = { `${BOOK.PRODUCT}/${product._id}` }
                                variant = 'cart big'
                                onClickRemoveProduct = { onClickRemoveProductHandler }
                            />
                        ))}
                    </NotData>
                    {products && (
                        <HorizontalRuleWithPrice
                            price = {
                                (products && products.length > 0 && products.map((product) => product.price)
                                    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)) || 0
                            }
                            text = { t('pages.cart.yourOrder') }
                        />
                    )}
                </div>

                {width < SCREENS_NUMBER.SB && (
                    <Button
                        className = 'capitalize'
                        onClick = { onClickContinueToCheckout }>
                        {t('pages.cart.continueToCheckout')}
                    </Button>
                )}
                {width > SCREENS_NUMBER.SB && (
                    <CartDetails className = 'sb:w-1/2' />
                )}
            </ContainerForOrdersAndInformationOfPayment>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Cart />
    </ErrorBoundary>
);
