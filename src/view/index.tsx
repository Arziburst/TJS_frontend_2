// Core
import React, { FC, useEffect, useCallback } from 'react';

// Init
import { CSS_VARIABLES, LOCAL_STORAGE } from '@/init';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Images
import '@/assets/images/image_category_brooch.png';
import '@/assets/images/image_category_see_all.png';
import '@/assets/images/test.png'; // todo remove when finish

// Routes
import { Routes } from './routes';

// Tools
import { ls, postcssViewportHeightCorrection, setValueToCSSVariable } from '@/tools/utils';

// Bus
import { useTogglesRedux } from '../bus/client/toggles';
import { useProfileSaga } from '@/bus/profile/saga';
import { useCartSaga } from '@/bus/cart/saga';

// Containers
import { Wrapper } from '@/view/containers';

// Components
import { Alert, Footer, Header, SideBar } from '@/view/components';

// Tools
import { useCssPropertyValue, useWindowWidth } from '@/tools/hooks';

// Styles
import '../assets/globalStyles/index.css';

export const App: FC = () => {
    const refWrapper = React.useRef<null | HTMLDivElement>(null);

    const [ paddingLeftWrapper ] = useCssPropertyValue({
        ref:      refWrapper,
        property: 'padding-left',
    });

    const [ width ] = useWindowWidth();

    const { setToggleAction: setTogglerAction } = useTogglesRedux();
    const { fetchAuthenticateProfile } = useProfileSaga();
    const { fetchCheckCart } = useCartSaga();

    const setOnlineStatusHandler = useCallback(() => void setTogglerAction({
        type:  'isOnline',
        value: navigator.onLine,
    }), [ setTogglerAction ]);

    useEffect(() => {
        postcssViewportHeightCorrection();
        fetchAuthenticateProfile();
        setOnlineStatusHandler();
        window.addEventListener('online', setOnlineStatusHandler);
        window.addEventListener('offline', setOnlineStatusHandler);
        fetchCheckCart(ls.get(LOCAL_STORAGE.CART) || []);
    }, []);

    useEffect(() => {
        paddingLeftWrapper && setValueToCSSVariable(
            CSS_VARIABLES.WRAPPER_LEFT_PADDING,
            paddingLeftWrapper,
        );
    }, [ paddingLeftWrapper ]);

    return (
        <div>
            {width < SCREENS_NUMBER.SB && (
                <SideBar variant = { 'close' } />
            )}
            <Alert />
            <Wrapper
                className = 'grid grid-rows-[auto_1fr_auto] min-h-screen'
                ref = { refWrapper }>
                <div style = {{
                    minHeight: `var(${CSS_VARIABLES.HEADER})`,
                }}>
                    <Header
                        isSetHeightToCssVariable
                        className = 'fixed inset-x-0'
                        style = { paddingLeftWrapper ? {
                            paddingLeft:  paddingLeftWrapper,
                            paddingRight: paddingLeftWrapper,
                        } : {} }
                        variant = 'open'
                    />
                </div>
                <Routes />
                <Footer />
            </Wrapper>
        </div>
    );
};
