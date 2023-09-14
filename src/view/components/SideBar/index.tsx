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
import { Footer, Icons, Nav } from '@/view/components';
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
            <SheetContent onClickCloseSideBar = { onClickCloseSideBarHandler }>
                <ScrollArea className = 'h-full'>
                    <SheetHeader>
                        <Nav
                            variant = 'mobile'
                            onClickCloseSideBar = { onClickCloseSideBarHandler }
                        />
                        {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription> */}
                    </SheetHeader>
                    <SheetFooter>
                        <Footer />
                    </SheetFooter>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
