// Core
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Book
import { BOOK } from '@/view/routes/book';

// Bus
import { useOrders } from '@/bus/orders';

// Containers
import { NotData } from '@/view/containers';

// Components
import { ErrorBoundary } from '../../components';
import { CardOrder } from './CardOrder';

// Types
import { Order } from '@/bus/orders/types';

type PropTypes = {
    /* type props here */
}

const Orders: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const { orders: { orders }, fetchOrders } = useOrders();

    // Handlers
    const onClickCardOrderHandler = (order: Order) => {
        navigate(BOOK.ORDER + `/${order._id}`);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <NotData
                className = { `flex flex-wrap gap-[14px] justify-center
                    sb:gap-[20px]` }
                isLoading = { false }>
                {orders?.map((order) => (
                    <CardOrder
                        key = { order._id }
                        order = { order }
                        onClickCardOrder = { onClickCardOrderHandler }
                    />
                ))}
            </NotData>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Orders />
    </ErrorBoundary>
);
