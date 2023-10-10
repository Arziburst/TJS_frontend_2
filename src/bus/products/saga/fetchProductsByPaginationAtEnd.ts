// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { productsByPaginationFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchProductsByPaginationAtEndAction = createAction<types.FetchProductsByPaginationAtEndRequest>(`${sliceName}/FETCH_PRODUCTS_BY_PAGINATION_AT_END_ASYNC`);

// Saga
const fetchProductsByPaginationAtEnd = (
    callAction: ReturnType<typeof fetchProductsByPaginationAtEndAction>,
) => makeRequest<types.FetchProductsByPaginationAtEndResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => productsByPaginationFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProductsAtEnd',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(productsActions.setProductsAtEnd(result.data));
        yield put(productsActions.setTotalOfProducts(result.total));
        yield put(productsActions.setTotalShowedOfProducts(result.totalShowed));
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProductsAtEnd',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchProductsByPaginationAtEnd(): SagaIterator {
    yield takeLatest(fetchProductsByPaginationAtEndAction.type, fetchProductsByPaginationAtEnd);
}
