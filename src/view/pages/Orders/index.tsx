// Core
import React, { FC, useEffect } from 'react';

// Bus
import { useOrders } from '@/bus/orders';

// Containers
import { NotData } from '@/view/containers';

// Components
import { ErrorBoundary } from '../../components';
import { CardOrder } from './CardOrder';

// Types
type PropTypes = {
    /* type props here */
}

const Orders: FC<PropTypes> = () => {
    const { orders: { orders }, fetchOrders } = useOrders();

    // Handlers
    const onClickCardOrderHandler = () => {
        console.log('text');
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
                        onClick = { () => onClickCardOrderHandler }
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
