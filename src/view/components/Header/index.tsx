// Core
import React, { FC } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Components
import { ButtonCart, Logo, Nav, SideBar } from '@/view/components';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export const SPACE_BETWEEN_ITEMS_OF_HEADER = 'px-[70px]';

export const Header: FC<PropTypes> = () => {
    const [ width ] = useWindowWidth();

    return (
        <header className = 'flex justify-between items-center py-4 sb:pt-[42px] sb:pb-[24px] sb:items-start'>
            {width < SCREENS_NUMBER.SB ? (
                <SideBar />
            ) : (
                <>
                    <Logo
                        className = 'whitespace-nowrap'
                        variant = 'desktop'
                    />
                    <Nav variant = 'desktop' />
                </>
            )}
            <ButtonCart className = 'whitespace-nowrap' />
        </header>
    );
};
