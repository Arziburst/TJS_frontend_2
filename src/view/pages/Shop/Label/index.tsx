// Core
import React, { FC } from 'react';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {}

export const Label: FC<PropTypes> = ({ children, ...props }) => {
    return (
        <p
            { ...props }
            className = 'text-sm text-[15px] font-secondary font-semibold opacity-50'>
            {children}
        </p>
    );
};
