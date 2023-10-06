// Core
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const variants = cva(
    '',
    {
        variants: {
            variant: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

// Styles
import S from './styles.module.css';

// Types
interface PropTypes
    extends React.AllHTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {
    asChild?: boolean;
    count?: number;
    isLoading: boolean;
}


const NotData = React.forwardRef<HTMLDivElement, PropTypes>(
    ({
        children,
        className,
        variant,
        count = 1,
        isLoading,
        asChild = false,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'div';

        const childCount = React.Children.count(children);

        if (isLoading) {
            return (
                <div className = { S.root }>
                    Loading...
                </div>
            );
        }

        if (childCount < count) {
            return (
                <div className = { S.root }>
                    Not Data
                </div>
            );
        }

        return (
            <Comp
                className = { cn(variants({ variant, className })) }
                ref = { ref }
                { ...props }>
                {children}
            </Comp>
        );
    },
);
NotData.displayName = 'NotData';

export { NotData };
