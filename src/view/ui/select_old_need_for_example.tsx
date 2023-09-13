import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
    'flex w-full items-center justify-between transition',
    {
        variants: {
            variant: {
                outline: '',
                ghost:   `text-sm font-secondary font-semibold
                    hover:text-quaternary`,
            },
            // isArrow:
        },
        defaultVariants: {
            variant: 'outline',
        },
    },
);

interface SelectTriggerPropTypes extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, VariantProps<typeof selectTriggerVariants> {
    isArrow?: true;
}

const SelectTrigger = React.forwardRef<
React.ElementRef<typeof SelectPrimitive.Trigger>,
SelectTriggerPropTypes
>((
    {
        className,
        variant,
        isArrow,
        children,
        ...props
    },
    ref,
) => (
    <SelectPrimitive.Trigger
        className = { cn(selectTriggerVariants({ variant, className })) }
        ref = { ref }
        { ...props }>
        {children}
        {isArrow && (
            <SelectPrimitive.Icon asChild>
                <ChevronDown className = 'h-4 w-4 opacity-50' />
            </SelectPrimitive.Icon>
        )}
    </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const selectContentVariants = cva(
    'flex w-full items-center justify-between transition',
    {
        variants: {
            variant: {
                outline: '',
                ghost:   '',
                shadow:  'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
            },
        },
        defaultVariants: {
            variant: 'shadow',
        },
    },
);

interface SelectContentPropTypes extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, VariantProps<typeof selectContentVariants> {}

const SelectContent = React.forwardRef<
React.ElementRef<typeof SelectPrimitive.Content>,
SelectContentPropTypes
>(({ className, variant, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            className = { cn(
                'relative z-50 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                selectContentVariants({ variant, className }),
            ) }
            position = { position }
            ref = { ref }
            { ...props }>
            <SelectPrimitive.Viewport
                className = { cn(
                    'p-1',
                    position === 'popper'
            && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                ) }>
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
React.ElementRef<typeof SelectPrimitive.Label>,
React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        className = { cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className) }
        ref = { ref }
        { ...props }
    />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const selectItemVariants = cva(
    `relative flex cursor-default select-none items-center rounded-sm text-sm outline-none
        hover:opacity-70
        focus-visible:opacity-70
        active:opacity-100
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        data-[state=checked]:text-quaternary`,
    {
        variants: {
            variant: {
                primary:   '',
                secondary: '',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    },
);

interface SelectItemPropTypes extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, VariantProps<typeof selectItemVariants> {

}

const SelectItem = React.forwardRef<
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

const SelectSeparator = React.forwardRef<
React.ElementRef<typeof SelectPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        className = { cn('-mx-1 my-1 h-px bg-muted', className) }
        ref = { ref }
        { ...props }
    />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
};
