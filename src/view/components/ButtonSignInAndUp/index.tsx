// Core
import React, { FC } from 'react';

// Book
import { BOOK } from '@/view/routes/book';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useProfile } from '@/bus/profile';

// Components
import { NavItem, NavItemPropTypes } from '@/view/components/Nav/NavItem';
import { DropdownMenu } from '../DropdownMenu';
import { Avatar } from '../Avatar';

// Types
interface PropTypes extends Omit<NavItemPropTypes, 'children' | 'to'> {
    /* type props here */
    isMobile: boolean;
}

export const ButtonSignInAndUp: FC<PropTypes> = ({
    className,
    isMobile,
    ...props
}) => {
    const { togglesRedux: { isLoggedIn }, setToggleAction } = useTogglesRedux();
    const { profile: { profile, isLoadings }, fetchLogoutProfile } = useProfile();

    const closeSideBar = () => {
        isMobile && setToggleAction({
            type:  'isOpenSideBar',
            value: false,
        });
    };

    const onClickLogoutHandler = () => {
        fetchLogoutProfile();
        closeSideBar();
    };

    if (isLoggedIn) {
        return (
            <li className = { className }>
                <DropdownMenu.Root modal = { false }>
                    <DropdownMenu.Trigger asChild>
                        <Avatar
                            fallback = { profile ? profile.name.slice(0, 2) : 'XX' }
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content side = { isMobile ? 'top' : 'right' }>
                        <DropdownMenu.Label>
                            Settings
                        </DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            propsButton = {{
                                isLoading: isLoadings.logout,
                            }}
                            onClick = { onClickLogoutHandler }>
                            Logout
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </li>
        );
    }

    return (
        <NavItem
            className = { className }
            to = { BOOK.SIGN_IN_AND_UP }
            onClick = { () => closeSideBar() }
            { ...props }>
            Sign In & Up
        </NavItem>
    );
};
