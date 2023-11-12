// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { getDataLiqPayOrderFetcher } from '@/api';

// Slice
import { ordersActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchGetDataLiqPayOrderAction = createAction<types.FetchGetDataLiqPayOrderRequest>(`${sliceName}/FETCH_GET_DATA_LIQPAY_ORDER_ASYNC`);

// Saga
const fetchGetDataLiqPayOrder = (
    callAction: ReturnType<typeof fetchGetDataLiqPayOrderAction>,
) => makeRequest<types.FetchGetDataLiqPayOrderResponse, commonTypes.Error>({
    callAction,
    toggleType:   'isLoadingFetchDataLiqPayOrder',
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => getDataLiqPayOrderFetcher(callAction.payload),
    },
    success: function* (result) {
        yield put(ordersActions.setDataLiqPayOrders(result));
    },
});

// Watcher
export function* watchFetchGetDataLiqPayOrder(): SagaIterator {
    yield takeLatest(fetchGetDataLiqPayOrderAction.type, fetchGetDataLiqPayOrder);
}
