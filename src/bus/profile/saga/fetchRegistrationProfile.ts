// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { registrationProfileFetcher } from '../../../api';

// Slice
import { profileActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchRegistrationProfileAction = createAction<types.FetchRegistrationProfileRequest>(`${sliceName}/FETCH_REGISTRATION_PROFILE_ASYNC`);

// Saga
const fetchRegistrationProfile = (
    callAction: ReturnType<typeof fetchRegistrationProfileAction>,
) => makeRequest<types.FetchRegistrationProfileResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => registrationProfileFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(profileActions.setIsLoadingOfProfile({
            type:  'profile',
            value: true,
        }));
    },
    success: function* (result) {
        yield console.log(result);
        // yield put(profileActions.setProfile(result));
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
export function* watchFetchRegistrationProfile(): SagaIterator {
    yield takeLatest(fetchRegistrationProfileAction.type, fetchRegistrationProfile);
}
