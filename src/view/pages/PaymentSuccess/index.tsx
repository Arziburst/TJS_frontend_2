// Core
import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useCustomTranslation, useWindowWidth } from '@/tools/hooks';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useCart } from '@/bus/cart';
import { useOrders } from '@/bus/orders';

// Book
import { BOOK, PARAMS_VALUES } from '@/view/routes/book';

// Containers
import { ContainerForOrdersAndInformationOfPayment, NotData } from '@/view/containers';

// Components
import { CardItem, ErrorBoundary, HorizontalRuleWithPrice } from '../../components';

// Elements
import { Button, TitlePage } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

const PaymentSuccess: FC<PropTypes> = () => {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get(PARAMS_VALUES.ID);

    const [ width ] = useWindowWidth();

    const { t } = useCustomTranslation();

    const { togglesRedux: { isLoadingFetchOrder }} = useTogglesRedux();
    const { resetCart } = useCart();
    const { orders: { currentOrder }, setCurrentOrder, fetchOrder } = useOrders();

    const onClickContinueShoppingHandler = () => {
        navigate(BOOK.SHOP);
    };

    useEffect(() => {
        resetCart();

        return () => {
            setCurrentOrder(null);
        };
    }, []);

    useEffect(() => {
        if (id) {
            fetchOrder(id);
        }
    }, [ id ]);

    const getTitlePage = () => (<TitlePage>{t('pages.paymentSuccess.title')}</TitlePage>);

    return (
        <div>
            <ContainerForOrdersAndInformationOfPayment>
                <div className = 'sb:w-1/2'>
                    {width < SCREENS_NUMBER.SB && getTitlePage()}
                    <div>
                        <NotData
                            className = { `flex flex-col gap-[18px] flex-wrap
                                sm:flex-row sm:justify-center
                                sb:gap-[24px] sb:flex-col sb:justify-start` }
                            isLoading = { isLoadingFetchOrder }
                            t = { t }>
                            {currentOrder?.orderedProducts.map((product) => (
                                <CardItem
                                    _id = { product.pid }
                                    available = { product.available }
                                    firstImage = {{ src: product.image, alt: t('altImages.product') }}
                                    key = { product.pid }
                                    price = { product.price }
                                    t = { t }
                                    title = { product.title }
                                    to = { `${BOOK.PRODUCT}/${product.pid}` }
                                    variant = 'cart small'
                                />
                            ))}
                        </NotData>
                        <HorizontalRuleWithPrice
                            price = {
                                (currentOrder && currentOrder?.orderedProducts.length > 0
                                    && currentOrder?.orderedProducts.map((product) => product.price)
                                        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)) || 0
                            }
                            text = { t('pages.paymentSuccess.grandTotal') }
                        />
                    </div>
                </div>
                <div className = 'sb:w-1/2'>
                    {width > SCREENS_NUMBER.SB && getTitlePage()}
                    {/* <p className = 'text-sm font-bold font-secondary tracking-[2.8px] uppercase'>an email receipt including the detail’s about your order has been sent to:</p> */}
                    <Button
                        className = 'capitalize sb:max-w-[500px]'
                        onClick = { onClickContinueShoppingHandler }>
                        {t('pages.paymentSuccess.buttonContinueShopping')}
                    </Button>
                </div>
            </ContainerForOrdersAndInformationOfPayment>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <PaymentSuccess />
    </ErrorBoundary>
);
