// Core
import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

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
import { TitlePage } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

const PaymentSuccess: FC<PropTypes> = () => {
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get(PARAMS_VALUES.ID);

    const [ width ] = useWindowWidth();

    const { togglesRedux: { isLoadingFetchOrder }} = useTogglesRedux();
    const { resetCart } = useCart();
    const { orders: { currentOrder }, fetchOrder } = useOrders();

    useEffect(() => {
        resetCart();
    }, []);

    useEffect(() => {
        if (id) {
            fetchOrder(id);
        }
    }, [ id ]);

    const getTitlePage = () => (<TitlePage>order success</TitlePage>);

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
                            isLoading = { isLoadingFetchOrder }>
                            {currentOrder?.orderedProducts.map((product) => (
                                <CardItem
                                    _id = { product.pid }
                                    available = { product.available }
                                    firstImage = {{ src: product.image, alt: 'Image of Product' }}
                                    key = { product.pid }
                                    price = { product.price }
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
                                        .reduce((accumulator, currentValue) => accumulator + currentValue), 0) || 0
                            }
                            text = 'grand total'
                        />
                    </div>
                </div>
                <div className = 'sb:w-1/2'>
                    {width > SCREENS_NUMBER.SB && getTitlePage()}
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
