// Core
import React, { FC } from 'react';
import {
    NavLink as NavLinkCore,
    NavLinkProps,
} from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const navLinkVariants = cva(
    'transition',
    {
        variants: {
            variant: {
                default: `hover:opacity-70
                    focus-visible:opacity-70
                    active:opacity-100`,
                underline: `hover:text-quaternary relative overflow-hidden pb-1 inline-block
                    after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-quaternary after:translate-x-[-150%] after:transition after:duration-500
                    before:content-[\'\'] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-quaternary before:transition before:duration-500
                    hover:after:translate-x-[0%]
                    hover:before:translate-x-[150%]
                    `,
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

// Types
interface PropTypes extends NavLinkProps, VariantProps<typeof navLinkVariants> {}


export const NavLink: FC<PropTypes> = ({ children, variant, className,  ...props }) => {
    return (
        <NavLinkCore
            className = { (params) => params.isActive ? cn(navLinkVariants({ variant, className }), 'text-quaternary') : cn(navLinkVariants({ variant, className })) }
            { ...props }>
            {children}
        </NavLinkCore>
    );
};
