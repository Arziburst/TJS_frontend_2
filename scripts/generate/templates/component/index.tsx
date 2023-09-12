// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Types
type PropTypes = {
    /* type props here */
}

export const __componentName__(pascalCase): FC<PropTypes> = ({ ...props }) => {
    return (
        <div {...props}>
            Component: __componentName__(pascalCase)
        </div>
    );
};
