// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

// API
import { updateOrderFetcher } from '@/api';

// Slice
import { sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchUpdateOrderAction = createAction<types.FetchUpdateOrderRequest>(`${sliceName}/FETCH_UPDATE_ORDER_ASYNC`);

// Saga
const fetchUpdateOrder = (
    callAction: ReturnType<typeof fetchUpdateOrderAction>,
) => makeRequest<types.FetchUpdateOrderResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => updateOrderFetcher(callAction.payload),
    },
    success: function* (result) {
        console.log('result:', result);
    },
});

// Watcher
export function* watchFetchUpdateOrder(): SagaIterator {
    yield takeLatest(fetchUpdateOrderAction.type, fetchUpdateOrder);
}
