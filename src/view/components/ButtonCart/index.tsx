// Core
import React, { FC } from 'react';

// UI
import { NavLink } from '@/view/elements';

// Types
type PropTypes = {
    /* type props here */
}

export const ButtonCart: FC<PropTypes> = ({ ...props }) => {
    return (
        <NavLink
            { ...props }
            to = '/cart'
            variant = 'underline'>
            Cart (03)
        </NavLink>
    );
};
