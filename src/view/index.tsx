// Core
import React, { FC, useEffect, useCallback } from 'react';

// Init
import { CSS_VARIABLES, LOCAL_STORAGE } from '@/init';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Images
import '@/assets/images/image_category_see_all.png';
import '@/assets/images/image_category_brooch.png';
import '@/assets/images/image_category_bestsellers.png';
import '@/assets/images/image_category_bracelets.png';
import '@/assets/images/image_category_earrings.png';
import '@/assets/images/image_category_necklace.png';
import '@/assets/images/image_category_rings.png';
import '@/assets/images/image_about_main.png';
import '@/assets/images/image_about_1.png';
import '@/assets/images/image_about_2.png';
import '@/assets/images/image_about_3.png';
import '@/assets/images/image_about_4.png';

// Routes
import { Routes } from './routes';

// Book
import { BOOK } from '@/view/routes/book';

// Tools
import { ls, postcssViewportHeightCorrection, setValueToCSSVariable } from '@/tools/utils';
import { useCssPropertyValue, useCustomTranslation, useWindowWidth } from '@/tools/hooks';

// Bus
import { useTogglesRedux } from '../bus/client/toggles';
import { useProfileSaga } from '@/bus/profile/saga';
import { useCartSaga } from '@/bus/cart/saga';

// Containers
import { Wrapper, wrapperVariants } from '@/view/containers';

// Components
import { Alert, CookieConsentBanner, Footer, Header, SideBar } from '@/view/components';

// Styles
import '../assets/globalStyles/index.css';

export const App: FC = () => {
    const refWrapper = React.useRef<null | HTMLDivElement>(null);

    const [ paddingLeftWrapper ] = useCssPropertyValue({
        ref:      refWrapper,
        property: 'padding-left',
    });

    const { t, i18n } = useCustomTranslation();

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

        if (window.location.pathname !== BOOK.PAYMENT_SUCCESS) {
            fetchCheckCart(ls.get(LOCAL_STORAGE.CART) || []);
        }
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
                <SideBar
                    i18n = { i18n }
                    t = { t }
                    variant = { 'close' }
                />
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
                        className = { wrapperVariants({ className: 'fixed inset-x-0' }) }
                        i18n = { i18n }
                        style = { paddingLeftWrapper ? {
                            paddingLeft:  paddingLeftWrapper,
                            paddingRight: paddingLeftWrapper,
                        } : {} }
                        t = { t }
                        variant = 'open'
                    />
                </div>
                <Routes />
                <Footer t = { t } />
            </Wrapper>
            <CookieConsentBanner
                t = { t }
                width = { width }
            />
        </div>
    );
};
