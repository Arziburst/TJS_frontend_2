// Core
import React, { FC, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Routes
import { Routes } from './routes';

// Hooks
import { useTogglesRedux } from '../bus/client/toggles';

// Containers
import { Wrapper } from '@/view/containers';

// Components
import { Alert, Footer, Header, SideBar } from '@/view/components';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Styles
import '../assets/globalStyles/index.css';
import { useProfileSaga } from '@/bus/profile/saga';

export const App: FC = () => {
    const [ width ] = useWindowWidth();

    const { setToggleAction: setTogglerAction } = useTogglesRedux();
    const { fetchAuthenticateProfile } = useProfileSaga();

    const setOnlineStatusHandler = useCallback(() => void setTogglerAction({
        type:  'isOnline',
        value: navigator.onLine,
    }), [ setTogglerAction ]);

    useEffect(() => {
        fetchAuthenticateProfile();
        setOnlineStatusHandler();
        window.addEventListener('online', setOnlineStatusHandler);
        window.addEventListener('offline', setOnlineStatusHandler);
    }, []);

    return (
        <Wrapper className = 'flex flex-col min-h-screen'>
            <Alert />
            <Header variant = 'open' />
            {width < SCREENS_NUMBER.SB && (
                <SideBar variant = { 'close' } />
            )}
            <div className = 'grow'>
                <Routes />
            </div>
            <Footer />
        </Wrapper>
    );
};
