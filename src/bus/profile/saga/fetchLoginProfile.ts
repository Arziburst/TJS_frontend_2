// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { LoginProfileFetcher } from '../../../api';

// Slice
import { profileActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchLoginProfileAction = createAction<types.FetchLoginProfileRequest>(`${sliceName}/FETCH_LOGIN_PROFILE_ASYNC`);

// Saga
const fetchLoginProfile = (
    callAction: ReturnType<typeof fetchLoginProfileAction >,
) => makeRequest<types.FetchLoginProfileResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => LoginProfileFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(profileActions.setIsLoadingOfProfile({
            type:  'profile',
            value: true,
        }));
    },
    success: function* (result) {
        // yield put(profileActions.setLogin(result));
    },
    error: function* (error) {
        yield put(profileActions.setErrorOfProfile(error));
    },
    finallyEnd: function* () {
        yield put(profileActions.setIsLoadingOfProfile({
            type:  'profile',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchLoginProfile(): SagaIterator {
    yield takeLatest(fetchLoginProfileAction.type, fetchLoginProfile);
}
