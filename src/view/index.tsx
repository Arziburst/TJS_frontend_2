// Core
import React, { FC, useEffect, useCallback } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Routes
import { Routes } from './routes';

// Hooks
import { useTogglesRedux } from '../bus/client/toggles';

// Containers
import { Wrapper } from '@/view/containers';

// Components
import { Header, SideBar } from './components';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Styles
import '../assets/globalStyles/index.css';

export const App: FC = () => {
    const [ width ] = useWindowWidth();

    const { setToggleAction: setTogglerAction } = useTogglesRedux();

    const setOnlineStatusHandler = useCallback(() => void setTogglerAction({
        type:  'isOnline',
        value: navigator.onLine,
    }), [ setTogglerAction ]);

    useEffect(() => {
        setOnlineStatusHandler();
        window.addEventListener('online', setOnlineStatusHandler);
        window.addEventListener('offline', setOnlineStatusHandler);
    }, []);

    return (
        <Wrapper>
            <Header variant = 'open' />
            {width < SCREENS_NUMBER.SB && (
                <SideBar variant = { 'close' } />
            )}
            <Routes />
        </Wrapper>
    );
};
