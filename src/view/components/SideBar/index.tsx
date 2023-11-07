// Core
import React, { FC } from 'react';

// UI
import {
    Sheet,
    SheetContent,
} from '@/view/components/SideBar/sheet';

// Components
import { Footer, Nav, SPACE_FOOTER } from '@/view/components';
import { useTogglesRedux } from '@/bus/client/toggles';
import { wrapperVariants } from '@/view/containers';

// Types
export type SideBarPropTypes = {
    /* type props here */
    variant?: 'open' | 'close';
}

export const SideBar: FC<SideBarPropTypes> = ({ ...props }) => {
    const { togglesRedux: { isOpenSideBar }, setToggleAction } = useTogglesRedux();

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
            <SheetContent
                className = { wrapperVariants() }
                onClickCloseSideBar = { onClickCloseSideBarHandler }>
                <div className = { `flex flex-col space-y-2 grow ${SPACE_FOOTER}` }>
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
