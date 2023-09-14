// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// UI
import * as ScrollAreaCore from '@radix-ui/react-scroll-area';

// Styles
import S from './styles.module.css';

// Types
interface PropTypes {
    children: any;
    className?: string;
    classNameViewport?: string;
}

export const ScrollArea: FC<PropTypes> = ({ children, className, classNameViewport, ...props }) => {
    return ( // todo add style for Thumb and Scrollbar
        <ScrollAreaCore.Root
            { ...props }
            className = { className }>
            <ScrollAreaCore.Viewport className = { cn(S.viewport, classNameViewport) }>
                {children}
            </ScrollAreaCore.Viewport>
            <ScrollAreaCore.Scrollbar
                orientation = 'horizontal'>
                <ScrollAreaCore.Thumb />
            </ScrollAreaCore.Scrollbar>
            <ScrollAreaCore.Scrollbar orientation = 'vertical'>
                <ScrollAreaCore.Thumb />
            </ScrollAreaCore.Scrollbar>
            <ScrollAreaCore.Corner />
        </ScrollAreaCore.Root>
    );
};
