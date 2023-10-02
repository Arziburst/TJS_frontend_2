// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// API
import { createNewProductFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest, removeKeysOfObject } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchCreateNewProductAction = createAction<types.FetchCreateNewProductRequest>(`${sliceName}/FETCH_CREATE_NEW_PRODUCT_ASYNC`);

// Saga
const fetchCreateNewProduct = (
    callAction: ReturnType<typeof fetchCreateNewProductAction>,
) => makeRequest<types.FetchCreateNewProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 201,
        fetch:             () => createNewProductFetcher(removeKeysOfObject<types.FetchCreateNewProductRequest, 'reset'>({
            keys:   [ 'reset' ],
            object: callAction.payload,
        })),
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'create',
            value: true,
        }));
    },
    success: function* () {
        yield callAction.payload.reset();
        yield toast.success('Product created successfully!');
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'create',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchCreateNewProduct(): SagaIterator {
    yield takeLatest(fetchCreateNewProductAction.type, fetchCreateNewProduct);
}
