// Core
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

// Tools
import { cn } from '@/tools/lib/utils';

const buttonVariants = cva(
    `w-full inline-flex items-center justify-center text-sm font-primary ring-offset-background transition
        focus-visible:outline-none
        hover:opacity-70
        active:opacity-100
        disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            variant: {
                default: `font-secondary text-sm py-5 border-2 border-secondary-100 text-primary-200 bg-secondary-100 transaction
                    hover:text-secondary-100 hover:bg-transparent hover:opacity-100
                    focus-visible:text-secondary-100 focus-visible:bg-transparent
                    sb:text-base`,
                // outline: `border border-input bg-background
                //     hover:bg-accent hover:text-accent-foreground`,
                // todo make animate bottom border
                // underline: `border-b-2
                //     hover:border-red-900`,
                // ghost: 'hover:bg-accent hover:text-accent-foreground',
                // link: `text-primary underline-offset-4
                //     hover:underline`,
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
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, disabled, className, variant, isLoading, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className = { cn(buttonVariants({ variant, className })) }
                disabled = { disabled || isLoading }
                ref = { ref }
                { ...props }>
                {isLoading && (
                    <Loader2 className = 'mr-2 h-4 w-4 animate-spin' />
                )}
                {children}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
