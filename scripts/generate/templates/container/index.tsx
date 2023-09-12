// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Types
type PropTypes = {
    /* type props here */
}

export const __containerName__(pascalCase): FC<PropTypes> = ({ children, ...props }) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};
