// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary, Tabs } from '../../components';
import { SignUp } from './SignUp';

// Types
type PropTypes = {
    /* type props here */
}

enum TABS_VALUES {
    IN = 'Sign In',
    UP = 'Sign Up',
}

const SignInAndUp: FC<PropTypes> = () => {
    return (
        <div className = 'flex justify-center'>
            <Tabs.Root
                className = 'w-[400px]'
                defaultValue = { TABS_VALUES.UP }>
                <Tabs.List>
                    <Tabs.Trigger value = { TABS_VALUES.IN }>{TABS_VALUES.IN}</Tabs.Trigger>
                    <Tabs.Trigger value = { TABS_VALUES.UP }>{TABS_VALUES.UP}</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                    className = 'w-full'
                    value = { TABS_VALUES.IN }>
                    in
                </Tabs.Content>
                <Tabs.Content
                    className = 'w-full'
                    value = { TABS_VALUES.UP }>
                    <SignUp />
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
