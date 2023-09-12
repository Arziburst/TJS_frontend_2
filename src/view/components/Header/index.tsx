// Core
import React, { FC } from 'react';

// Components
import { ButtonCart, SideBar } from '@/view/components';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export const Header: FC<PropTypes> = () => {
    return (
        <header className = 'flex justify-between py-4'>
            <SideBar />
            <ButtonCart />
        </header>
    );
};
