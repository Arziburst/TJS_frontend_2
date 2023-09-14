// Core
import React, { FC } from 'react';

// Book
import * as BOOK from '@/view/routes/book';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Components
import { Avatar, ButtonCart, ButtonSignInAndUp, Icons, Logo, Nav, SideBar, SideBarPropTypes } from '@/view/components';
import { SheetTrigger } from '../SideBar/sheet';
import { useTogglesRedux } from '@/bus/client/toggles';
import { cn } from '@/tools/lib/utils';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, SideBarPropTypes {}

export const GAP_BETWEEN_ITEMS_OF_HEADER = 'gap-[70px]';

export const Header: FC<PropTypes> = ({ variant }) => {
    const [ width ] = useWindowWidth();

    const isOpen = variant === 'open';
    const isSB = width < SCREENS_NUMBER.SB;


    const { togglesRedux: { isOpenSideBar }, setToggleAction } = useTogglesRedux();

    const onClickOpenSideBarHandler = () => {
        setToggleAction({
            type:  'isOpenSideBar',
            value: true,
        });
    };

    const onClickCloseSideBarHandler = () => {
        setToggleAction({
            type:  'isOpenSideBar',
            value: false,
        });
    };

    return (
        <header className = { cn(
            `flex justify-between items-center sb:items-start sb:${GAP_BETWEEN_ITEMS_OF_HEADER}`,
            { 'py-4 sb:pt-[42px] sb:pb-[24px]': isOpen },
            { '': !isOpen },
        ) }>
            {isSB ? (
                // <SideBar variant = { variant } />
                <button
                    className = 'aspect-square transition-opacity hover:opacity-70'
                    onClick = { isOpen ? onClickOpenSideBarHandler : onClickCloseSideBarHandler }>
                    {isOpen ? (
                        <Icons.SideBarOpen />
                    ) : (
                        <Icons.SideBarClose />
                    )}
                </button>
            ) : (
                <>
                    <Logo
                        className = 'whitespace-nowrap'
                        variant = 'desktop'
                    />
                    <Nav variant = 'desktop' />
                </>
            )}
            {!isOpen && (
                <Logo
                    variant = 'mobile'
                    onClick = { onClickCloseSideBarHandler }
                />
            )}
            <ul className = 'flex flex-col items-end self-stretch'>
                <ButtonCart
                    className = 'whitespace-nowrap'
                    onClick = { onClickCloseSideBarHandler }
                />
                {isOpen && !isSB && (
                    <ButtonSignInAndUp
                        className = 'whitespace-nowrap'
                        onClick = { onClickCloseSideBarHandler }
                    />

                )}
            </ul>
        </header>
    );
};
