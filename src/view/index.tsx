// Core
import React, { FC, useEffect, useCallback } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Images
import '@/assets/images/image_category_brooch.png';

// Routes
import { Routes } from './routes';

// Hooks
import { useTogglesRedux } from '../bus/client/toggles';

// Bus
import { useProfileSaga } from '@/bus/profile/saga';

// Containers
import { Wrapper } from '@/view/containers';

// Components
import { Alert, Footer, Header, SideBar } from '@/view/components';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Styles
import '../assets/globalStyles/index.css';

export const App: FC = () => {
    const [ width ] = useWindowWidth();

    const { setToggleAction: setTogglerAction } = useTogglesRedux();
    const { fetchAuthenticateProfile } = useProfileSaga();

    const setOnlineStatusHandler = useCallback(() => void setTogglerAction({
        type:  'isOnline',
        value: navigator.onLine,
    }), [ setTogglerAction ]);

    useEffect(() => {
        // fetchAuthenticateProfile();
        setOnlineStatusHandler();
        window.addEventListener('online', setOnlineStatusHandler);
        window.addEventListener('offline', setOnlineStatusHandler);
    }, []);

    return (
        <div>
            {width < SCREENS_NUMBER.SB && (
                <SideBar variant = { 'close' } />
            )}
            <Alert />
            <Wrapper className = 'grid grid-rows-[auto_1fr_auto] min-h-screen'>
                <Header variant = 'open' />
                <Routes />
                <Footer />
            </Wrapper>
        </div>
    );
};
