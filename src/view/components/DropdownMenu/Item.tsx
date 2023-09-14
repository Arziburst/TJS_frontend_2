// Core
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// Tools
import { cn } from '@/tools/lib/utils';

export const Item = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
}
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        className = { cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            className,
        ) }
        ref = { ref }
        { ...props }
    />
));
Item.displayName = DropdownMenuPrimitive.Item.displayName;
