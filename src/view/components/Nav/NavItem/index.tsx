// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { NavLink } from '@/view/elements';
import { NavItemText } from './NavItemText';

// Types
interface NavItemPropTypes extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>{
    children: string;
    onClickCloseSidebarHandler?: () => void;
}

export const NavItem: FC<NavItemPropTypes> = ({
    children,
    className,
    onClickCloseSidebarHandler,
    ...props
}) => {
    return (
        <li
            { ...props }
            className = { cn('text-center', className) }>
            <NavLink
                to = { children }
                variant = 'underline'
                onClick = { onClickCloseSidebarHandler }>
                <NavItemText>
                    {children.replace('/', '')}
                </NavItemText>
            </NavLink>
        </li>
    );
};
