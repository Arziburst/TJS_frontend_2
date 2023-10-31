// Core
import { configureStore } from '@reduxjs/toolkit';

// MarkerGen reducers
import orders from '../../bus/orders/slice';
import newPost from '../../bus/newPost/slice';
import cart from '../../bus/cart/slice';
import gallery from '../../bus/gallery/slice';
import profile from '../../bus/profile/slice';
import products from '../../bus/products/slice';
import toggles from '../../bus/client/toggles';

// Middleware
import {
    middleware,
    // MarkerGen sagaMiddleware
    sagaMiddleware,
} from './middleware';

// MarkerGen import rootSaga
import { rootSaga } from './rootSaga';

export const store = configureStore({
    reducer: {
        // MarkerGen add reducer
        orders,
        newPost,
        cart,
        gallery,
        profile,
        products,
        toggles,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>

// MarkerGen run rootSaga
sagaMiddleware.run(rootSaga);
