// Core
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { ErrorBoundary, Tabs } from '../../components';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

// Types
type PropTypes = {
    /* type props here */
}

enum TABS_VALUES {
    IN = 'Sign In',
    UP = 'Sign Up',
}

const SignInAndUp: FC<PropTypes> = () => {
    const { t } = useTranslation();

    return (
        <div className = 'flex justify-center'>
            <Tabs.Root
                className = 'max-w-[400px]'
                defaultValue = { TABS_VALUES.IN }>
                <Tabs.List>
                    <Tabs.Trigger value = { TABS_VALUES.IN }>{TABS_VALUES.IN}</Tabs.Trigger>
                    <Tabs.Trigger value = { TABS_VALUES.UP }>{TABS_VALUES.UP}</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                    className = 'w-full'
                    value = { TABS_VALUES.IN }>
                    <SignIn t = { t } />
                </Tabs.Content>
                <Tabs.Content
                    className = 'w-full'
                    value = { TABS_VALUES.UP }>
                    <SignUp t = { t } />
                </Tabs.Content>
            </Tabs.Root>

        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <SignInAndUp />
    </ErrorBoundary>
);
