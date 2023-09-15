// Core
import React, { FC, useCallback } from 'react';

// UI
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/view/components/SideBar/sheet';

// Components
import { Footer, Icons, Nav, SPACE_FOOTER } from '@/view/components';
import { useTogglesRedux } from '@/bus/client/toggles';
import { ScrollArea } from '@/view/containers';

// Types
export type SideBarPropTypes = {
    /* type props here */
    variant?: 'open' | 'close';
}

export const SideBar: FC<SideBarPropTypes> = ({ variant = 'open', ...props }) => {
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
        <Sheet
            open = { isOpenSideBar }
            { ...props }>
            {/* <SheetTrigger
                className = 'aspect-square transition-opacity hover:opacity-70'
                onClick = { variant === 'open' ? onClickOpenSideBarHandler : onClickCloseSideBarHandler }>
                {variant === 'open' ? (
                    <Icons.SideBarOpen />
                ) : (
                    <Icons.SideBarClose />
                )}
            </SheetTrigger> */}
            <SheetContent
                onClickCloseSideBar = { onClickCloseSideBarHandler }>
                <div className = { `flex flex-col space-y-2 h-full ${SPACE_FOOTER}` }>
                    <Nav
                        variant = 'mobile'
                        onClickCloseSideBar = { onClickCloseSideBarHandler }
                    />
                </div>
                <div>
                    <Footer />
                </div>
            </SheetContent>
        </Sheet>
    );
};
