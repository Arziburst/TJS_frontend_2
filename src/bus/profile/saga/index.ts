// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// MarkerGen Watchers & Actions
import { fetchLoginProfileAction, watchFetchLoginProfile } from './fetchLoginProfile';
import { fetchRegistrationProfileAction, watchFetchRegistrationProfile } from './fetchRegistrationProfile';

// Types
import * as types from './types';

export const useProfileSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchRegistrationProfile: (
            payload: types.FetchRegistrationProfileRequest,
        ) => dispatch(fetchRegistrationProfileAction(payload)),
        fetchLoginProfile: (_id: types.FetchLoginProfileRequest) => dispatch(fetchLoginProfileAction(_id)),
        // MarkerGen function
    };
};

export function* watchProfile(): SagaIterator {
    yield all([
        // MarkerGen watchers
        call(watchFetchLoginProfile),
        call(watchFetchRegistrationProfile),
    ]);
}
