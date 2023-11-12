// Core
import React, { FC } from 'react';
import { TFunction, i18n } from 'i18next';

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
    t: TFunction;
    i18n: i18n;
    variant?: 'open' | 'close';
}

export const SideBar: FC<SideBarPropTypes> = ({
    t,
    i18n,
    ...props
}) => {
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
                i18n = { i18n }
                t = { t }
                onClickCloseSideBar = { onClickCloseSideBarHandler }>
                <div className = { `flex flex-col space-y-2 grow ${SPACE_FOOTER}` }>
                    <Nav
                        i18n = { i18n }
                        t = { t }
                        variant = 'mobile'
                        onClickCloseSideBar = { onClickCloseSideBarHandler }
                    />
                </div>
                <div>
                    <Footer t = { t } />
                </div>
            </SheetContent>
        </Sheet>
    );
};
