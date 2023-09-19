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
        <div style = {{ overflow: 'scroll' }}>
            {children}
        </div>
    );
};
