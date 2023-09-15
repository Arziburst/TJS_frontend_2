// Core
import * as React from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Hooks
import { useFormField } from './hooks';

export const FormMessage = React.forwardRef<
HTMLParagraphElement,
React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
        return null;
    }

    return (
        <p
            className = { cn('text-sm font-medium text-destructive', className) }
            id = { formMessageId }
            ref = { ref }
            { ...props }>
            {body}
        </p>
    );
});
FormMessage.displayName = 'FormMessage';
