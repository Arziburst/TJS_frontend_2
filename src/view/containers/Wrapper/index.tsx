// Core
import React, { FC } from 'react';

// Types
interface PropTypes extends React.HTMLProps<HTMLDivElement> {}

export const Wrapper: FC<PropTypes> = ({ children, ...props }) => {
    return (
        <div
            { ...props }
            className = 'px-[10px] sm:px-[20px] md:px-[40px]'>
            {children}
        </div>
    );
};
