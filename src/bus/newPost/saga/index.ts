// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// MarkerGen Watchers & Actions
import { fetchCitiesNewPostAction, watchFetchCitiesNewPost } from './fetchCitiesNewPost';

// Types
import * as types from './types';

export const useNewPostSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchCitiesNewPost: (payload: types.FetchCitiesNewPostRequest) => void dispatch(
            fetchCitiesNewPostAction(payload),
        ),
    // MarkerGen function
    };
};

export function* watchNewPost(): SagaIterator {
    yield all([
        // MarkerGen watchers
        call(watchFetchCitiesNewPost),
    ]);
}
