// Core
import React, { FC, useEffect, useRef } from 'react';

// Init
import { CSS_VARIABLES } from '@/init';

// Tools
import { cn } from '@/tools/lib/utils';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';

// Book
import { BOOK } from '@/view/routes/book';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Components
import {
    Avatar,
    ButtonCart,
    ButtonSignInAndUp,
    Icons,
    Logo,
    Nav,
    SideBar,
    SideBarPropTypes,
} from '@/view/components';
import { SheetTrigger } from '../SideBar/sheet';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, SideBarPropTypes {}

export const Header: FC<PropTypes> = ({ variant }) => {
    const refHeader = useRef<null | HTMLElement>(null);

    const [ width ] = useWindowWidth();

    const isOpen = variant === 'open';
    const isSB = width < SCREENS_NUMBER.SB;

    const { setToggleAction } = useTogglesRedux();

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

    useEffect(() => {
        if (refHeader.current && refHeader.current.clientHeight) {
            document.documentElement.style.setProperty(CSS_VARIABLES.HEADER, `${refHeader.current.clientHeight}px`);
        }
    }, [ refHeader.current?.clientHeight ]);

    return (
        <header
            className = { cn(
                'flex justify-between items-center sb:items-start sb:gap-x-between-items-of-header',
                { 'py-4 sb:pt-[24px] sb:pb-[24px]': isOpen },
                { '': !isOpen },
            ) }
            ref = { refHeader }>
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
                        isMobile = { false }
                        onClick = { onClickCloseSideBarHandler }
                    />
                )}
            </ul>
        </header>
    );
};
