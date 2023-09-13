// Core
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const buttonVariants = cva(
    `inline-flex items-center justify-center text-sm font-primary ring-offset-background transition-colors 
        focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50
        active:opacity-70`,
    {
        variants: {
            variant: {
                default: `py-5 w-full border-2 border-secondary-100 text-primary-200 bg-secondary-100 transaction
                    hover:text-secondary-100 hover:bg-transparent 
                    focus-visible:text-secondary-100 focus-visible:bg-transparent`,
                outline: `border border-input bg-background 
                    hover:bg-accent hover:text-accent-foreground`,
                // todo make animate bottom border
                underline: `border-b-2
                    hover:border-red-900`,
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link:  `text-primary underline-offset-4 
                    hover:underline`,
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className = { cn(buttonVariants({ variant, className })) }
                ref = { ref }
                { ...props }
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
