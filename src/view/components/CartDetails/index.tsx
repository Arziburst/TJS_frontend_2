// Core
import React, { FC } from 'react';

// Types
type PropTypes = {
    /* type props here */
}

export const CartDetails: FC<PropTypes> = ({ ...props }) => {
    return (
        <div { ...props }>
            Component: CartDetails
        </div>
    );
};
