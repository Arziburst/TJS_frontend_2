// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// UI
import { NavLink, NavLinkPropTypes } from '@/view/elements';

// Types
interface PropTypes extends Omit<NavLinkPropTypes, 'to' | 'variant'> {
    /* type props here */
}

export const ButtonCart: FC<PropTypes> = ({ className, ...props }) => {
    return (
        <NavLink
            className = { cn(
                `text-xs font-secondary font-semibold capitalize
                    sb:text-base sb:text-[15px]`,
                className,
            ) }
            { ...props }
            to = '/cart'
            variant = 'underline'>
            Cart (03)
        </NavLink>
    );
};
