// Core
import React, { FC } from 'react';

// Types
type PropTypes = {
    /* type props here */
}

export const __elementName__(pascalCase): FC<PropTypes> = ({ ...props }) => {
    return (
        <div {...props}>
            Element: __elementName__(pascalCase)
        </div>
    );
};
