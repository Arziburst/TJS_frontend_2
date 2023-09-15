// Core
import { cn } from '@/tools/lib/utils';
import React, { FC } from 'react';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Wrapper: FC<PropTypes> = ({ children, className, ...props }) => {
    return (
        <div
            { ...props }
            className = { cn('px-[10px] sm:px-[20px] md:px-[40px]', className) }>
            {children}
        </div>
    );
};
