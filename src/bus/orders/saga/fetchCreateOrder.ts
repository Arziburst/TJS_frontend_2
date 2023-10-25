// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { createOrderFetcher } from '@/api';

// Slice
import { ordersActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchCreateOrderAction = createAction<types.FetchCreateOrderRequest>(`${sliceName}/FETCH_CREATE_ORDER_ASYNC`);

// Saga
const fetchCreateOrder = (
    callAction: ReturnType<typeof fetchCreateOrderAction>,
) => makeRequest<types.FetchCreateOrderResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => createOrderFetcher(callAction.payload),
    },
    success: function* (result) {
        yield console.log(result);
        // yield put(ordersActions.setOrders(result));
    },
});

// Watcher
export function* watchFetchCreateOrder(): SagaIterator {
    yield takeLatest(fetchCreateOrderAction.type, fetchCreateOrder);
}
