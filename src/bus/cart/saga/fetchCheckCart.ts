// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Init
import { LOCAL_STORAGE } from '@/init';

// API
import { checkCartFetcher } from '../../../api';

// Slice
import { cartActions, sliceName } from '../slice';

// Tools
import { ls, makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchCheckCartAction = createAction<types.FetchCheckCartRequest>(`${sliceName}/FETCH_CHECK_CART_ASYNC`);

// Saga
const fetchCheckCart = (
    callAction: ReturnType<typeof fetchCheckCartAction>,
) => makeRequest<types.FetchCheckCartResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => checkCartFetcher(callAction.payload),
    },
    success: function* (result) {
        yield put(cartActions.setCart(result));
        yield ls.set(LOCAL_STORAGE.CART, result);
    },
});

// Watcher
export function* watchFetchCheckCart(): SagaIterator {
    yield takeLatest(fetchCheckCartAction.type, fetchCheckCart);
}
