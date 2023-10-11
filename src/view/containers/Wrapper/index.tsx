// Core
import React, { forwardRef } from 'react';

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
            className = { cn('px-[16px] sm:px-[32px] md:px-[40px] sb:px-[56px]', className) }>
            {children}
        </div>
    );
});
