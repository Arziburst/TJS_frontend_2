// Core
import React, { FC } from 'react';

// Book
import { BOOK } from '@/view/routes/book';

// Tools
import { cn } from '@/tools/lib/utils';

// Components
import { NavItem, NavItemPropTypes } from '@/view/components/Nav/NavItem';
import { useCart } from '@/bus/cart';

// Types
interface PropTypes extends Omit<NavItemPropTypes, 'children' | 'to'> {
    /* type props here */
}

export const ButtonCart: FC<PropTypes> = ({ className, ...props }) => {
    const { cart } = useCart();

    const getNumber = () => {
        if (cart && cart.length > 0) {
            if (cart.length < 9) {
                return `(0${cart.length})`;
            }

            return `(${cart.length})`;
        }

        return '';
    };

    return (
        <NavItem
            classNameNavItemText = { cn(
                'text-xs capitalize not-italic',
                className,
            ) }
            to = { BOOK.CART }
            { ...props }>
            {`Cart ${getNumber()}`}
        </NavItem>
    );
};
