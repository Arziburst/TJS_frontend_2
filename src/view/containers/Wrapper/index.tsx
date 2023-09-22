// Core
import React, { FC, forwardRef } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Types
// interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Wrapper = forwardRef<HTMLDivElement, any>(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref = { ref }
            { ...props }
            className = { cn('px-[10px] sm:px-[20px] md:px-[40px]', className) }>
            {children}
        </div>
    );
});
