// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    /* type props here */
}

export const __containerName__(pascalCase): FC<PropTypes> = ({ children, ...props }) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};
