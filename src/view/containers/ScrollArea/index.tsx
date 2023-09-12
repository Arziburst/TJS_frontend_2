// Core
import React, { FC } from 'react';

// UI
import * as ScrollAreaCore from '@radix-ui/react-scroll-area';

// Styles
import S from './styles.module.css';

// Types
interface PropTypes {
    children: any;
    className?: string;
}

export const ScrollArea: FC<PropTypes> = ({ children, className, ...props }) => {
    return ( // todo add style for Thumb and Scrollbar
        <ScrollAreaCore.Root
            { ...props }
            className = { className }>
            <ScrollAreaCore.Viewport className = { S.viewport }>
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
