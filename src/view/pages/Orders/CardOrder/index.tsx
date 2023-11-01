// Core
import React, { FC } from 'react';
import moment from 'moment';

// Utils
import { cn } from '@/tools/lib/utils';
import { returnStylesStatus, transformStatusToString } from '@/tools/utils';

// Elements
import { Badge, Button, Image } from '@/view/elements';

// Types
import { Order } from '@/bus/orders/types';

type PropTypes = {
    order: Order;
    onClickCardOrder: (order: Order) => void;
}

export const CardOrder: FC<PropTypes> = ({
    order,
    onClickCardOrder,
    ...props
}) => {
    const createdDate = moment(order.created)
        .locale('ru')
        .format('L');
    const createdTime = moment(order.created)
        .locale('ru')
        .format('LT');
    const parsedCreated = `${createdDate} ${createdTime}`;

    const onClickCardOrderHandler = () => onClickCardOrder(order);

    return (
        <Button
            className = { `relative p-0 w-[200px] h-[260px] flex flex-col
                sb:w-[200px] sb:h-[260px]` }
            { ...props }
            variant = { 'outline' }
            onClick = { onClickCardOrderHandler }>
            {order.orderedProducts.map((product, index, array) => (
                <Image
                    alt = { 'Image of Order' }
                    className = { 'w-full' }
                    key = { product.pid }
                    src = { product.image }
                    style = {{ height: `${100 / array.length}%` }}
                />
            ))}
            <div className = 'absolute right-[10px] top-[10px] flex flex-col items-end gap-[6px]'>
                <Badge>
                    {parsedCreated}
                </Badge>
                <Badge className = { cn(returnStylesStatus(order.status)) }>
                    {transformStatusToString(order.status)}
                </Badge>
            </div>
            <Badge className = 'absolute right-[10px] bottom-[10px]'>
                {order.orderedProducts.reduce((acc, product) => acc + product.price, 0)} ₴
            </Badge>
        </Button>
    );
};
