// Core
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const selectItemVariants = cva(
    `relative flex cursor-default select-none items-center rounded-sm text-sm outline-none transition
        hover:opacity-70
        focus-visible:opacity-70
        active:opacity-100
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
    {
        variants: {
            variant: {
                primary: `font-semibold 
                    data-[state=checked]:text-quaternary`,
                secondary: `text-base font-tertiary font-medium
                    hover:text-primary hover:bg-secondary-100
                    data-[state=checked]:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]`,
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

interface SelectItemPropTypes extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, VariantProps<typeof selectItemVariants> {

}

export const SelectItem = React.forwardRef<
React.ElementRef<typeof SelectPrimitive.Item>,
SelectItemPropTypes
>(({ variant, className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        className = { cn(selectItemVariants({ variant, className })) }
        ref = { ref }
        { ...props }>
        {/* <span className = 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
            <SelectPrimitive.ItemIndicator>
                <Check className = 'h-4 w-4' />
            </SelectPrimitive.ItemIndicator>
        </span> */}

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
