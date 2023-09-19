// Core
import React, { FC } from 'react';

// Book
import { BOOK } from '@/view/routes/book';

// Tools
import { cn } from '@/tools/lib/utils';

// Components
import { NavItem, NavItemPropTypes } from '@/view/components/Nav/NavItem';

// Types
interface PropTypes extends Omit<NavItemPropTypes, 'children' | 'to'> {
    /* type props here */
}

export const ButtonCart: FC<PropTypes> = ({ className, ...props }) => {
    return (
        <NavItem
            classNameNavItemText = { cn(
                'text-xs capitalize not-italic',
                className,
            ) }
            to = { BOOK.CART }
            { ...props }>
            Cart (03)
        </NavItem>
    );
    // return (
    //     <NavLink
    //         className = { cn(
    //             `text-xs font-secondary font-semibold capitalize
    //                 sb:text-base sb:text-[15px]`,
    //             className,
    //         ) }
    //         { ...props }
    //         to = '/cart'
    //         variant = 'underline'>
    //         Cart (03)
    //     </NavLink>
    // );
};
