// Core
import React, { FC } from 'react';

// Book
import * as BOOK from '@/view/routes/book';

// Components
import { NavItem, NavItemPropTypes } from '@/view/components/Nav/NavItem';

// Types
interface PropTypes extends Omit<NavItemPropTypes, 'children' | 'to'> {
    /* type props here */
}

export const ButtonSignInAndUp: FC<PropTypes> = ({ className, ...props }) => {
    return (
        <NavItem
            className = { className }
            to = { BOOK.SIGN_IN_AND_UP }
            { ...props }>
            Sign In & Up
        </NavItem>
    );
    // return (
    //     <NavLink
    //         className = { cn(
    //             `text-xs font-secondary font-semibold capitalize
    //                 sb:text-base`,
    //             className,
    //         ) }
    //         to = { BOOK.SIGN_IN_AND_UP }
    //         variant = 'underline'
    //         { ...props }>
    //         Sign In & Sign Up
    //     </NavLink>
    // );
};
