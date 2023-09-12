// Core
import React, { FC, useEffect, useCallback } from 'react';

// Routes
import { Routes } from './routes';

// Hooks
import { useTogglesRedux } from '../bus/client/toggles';

// Containers
import { Wrapper } from '@/view/containers';

// Components
import { Header } from './components';

// Styles
import '../assets/globalStyles/index.css';

export const App: FC = () => {
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
            <Header />
            <Routes />
        </Wrapper>
    );
};
