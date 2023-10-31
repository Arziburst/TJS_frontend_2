// Core
import React, { FC } from 'react';

// Elements
import { Button, Image } from '@/view/elements';

// Types
import { Order } from '@/bus/orders/types';

interface PropTypes extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    order: Order;
}

export const CardOrder: FC<PropTypes> = ({ order, ...props }) => {
    return (
        <Button
            className = { `w-[200px] h-[260px] flex flex-col
                sb:w-[200px] sb:h-[260px]` }
            { ...props }
            variant = { 'default' }>
            {order.orderedProducts.map((product, index, array) => (
                <Image
                    alt = { 'Image of Order' }
                    className = { 'w-full' }
                    src = { product.image }
                    style = {{ height: `${100 / array.length}%` }}
                />
            ))}
        </Button>
    );
};
