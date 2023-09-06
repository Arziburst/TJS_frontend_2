// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { __sagaName__Fetch } from '../../../api';

// Slice
import { __sagaName__Actions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetch__sagaName__(pascalCase)Action = createAction < types.Fetch__sagaName__(pascalCase)Request > (`${sliceName}/FETCH___sagaName__(constantCase)_ASYNC`);

// Saga
const fetch__sagaName__(pascalCase) = (
    callAction: ReturnType<typeof fetch__sagaName__(pascalCase)Action >,
) => makeRequest < types.Fetch__sagaName__(pascalCase)Response, commonTypes.Error > ({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch: __sagaName__Fetch,
    },
    tryStart: function* () {
        yield put(__sagaName__Actions.setIsLoadingOf__sagaName__(pascalCase)({
            type: '__sagaName__',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(__sagaName__Actions.set__sagaName__(pascalCase)(result));
    },
    error: function* (error) {
        yield put(__sagaName__Actions.setErrorOf__sagaName__(pascalCase)(error));
    },
    finallyEnd: function* () {
        yield put(__sagaName__Actions.setIsLoadingOf__sagaName__(pascalCase)({
            type: '__sagaName__',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetch__sagaName__(pascalCase)(): SagaIterator {
    yield takeLatest(fetch__sagaName__(pascalCase)Action.type, fetch__sagaName__(pascalCase));
}
