// Core
import React, { FC } from 'react';
import { Link as LinkReactRouterDom, LinkProps } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const linkVariants = cva(
    '',
    {
        variants: {
            variant: {
                default: `hover:opacity-70
                    focus-visible:opacity-70
                    active:opacity-100`,
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

interface PropTypes extends LinkProps, VariantProps<typeof linkVariants> {}

export const Link: FC<PropTypes> = ({ children, className, variant, ...props }) => {
    return (
        <LinkReactRouterDom
            className = { cn(linkVariants({ variant, className })) }
            { ...props }>
            {children}
        </LinkReactRouterDom>
    );
};
