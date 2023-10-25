// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Slice
import { ordersActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';
import { API_URL } from '../../../init/constants';

// Action
export const fetchOrdersAction = createAction<number>(`${sliceName}/FETCH_ORDERS_ASYNC`);

// Types
import { Orders } from '../types';

// Saga
const fetchOrders = (callAction: ReturnType<typeof fetchOrdersAction>) => makeRequest<Orders>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => fetch(`${API_URL}/orders`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    },
    success: function* (result) {
        yield console.log(result);
        yield put(ordersActions.setOrders(result));
    },
});

// Watcher
export function* watchFetchOrders(): SagaIterator {
    yield takeLatest(fetchOrdersAction.type, fetchOrders);
}
