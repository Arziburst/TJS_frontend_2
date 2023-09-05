// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { incrementProductViewsFetch } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../common';
import * as types from '../types';

// Action
export const fetchIncrementProductViewsAction = createAction<types.FetchIncrementProductViewsRequest>(`${sliceName}/FETCH_INCREMENT_PRODUCT_VIEWS_ASYNC`);

// Saga
const fetchIncrementProductViews = (
    callAction: ReturnType<typeof fetchIncrementProductViewsAction>,
) => makeRequest<types.FetchIncrementProductViewsResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => incrementProductViewsFetch(callAction.payload),
    },
    tryStart: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts(true));
        }
    },
    success: function* (result) {
        yield put(productsActions.setEditedProduct(result));
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts(false));
        }
    },
});

// Watcher
export function* watchFetchIncrementProductViews(): SagaIterator {
    yield takeLatest(fetchIncrementProductViewsAction.type, fetchIncrementProductViews);
}
