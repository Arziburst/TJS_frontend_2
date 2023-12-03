// Core
import React, { FC } from 'react';

// Tools
import { useCustomTranslation } from '@/tools/hooks';

// Components
import { ErrorBoundary, Tabs } from '../../components';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

// Types
type PropTypes = {
    /* type props here */
}

enum TABS_VALUES {
    IN = 'signIn',
    UP = 'signUp',
}

const SignInAndUp: FC<PropTypes> = () => {
    const { t } = useCustomTranslation();

    return (
        <div className = 'flex justify-center'>
            <Tabs.Root
                className = 'max-w-[400px]'
                defaultValue = { TABS_VALUES.IN }>
                <Tabs.List>
                    <Tabs.Trigger value = { TABS_VALUES.IN }>
                        {t(`pages.signInAndUp.${TABS_VALUES.IN}.root`)}
                    </Tabs.Trigger>
                    <Tabs.Trigger value = { TABS_VALUES.UP }>
                        {t(`pages.signInAndUp.${TABS_VALUES.UP}.root`)}
                    </Tabs.Trigger>
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
