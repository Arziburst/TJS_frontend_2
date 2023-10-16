// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// MarkerGen Watchers & Actions
import { fetchCheckCartAction, watchFetchCheckCart } from './fetchCheckCart';

// Types
import * as types from './types';

export const useCartSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchCheckCart: (payload: types.FetchProductRequest) => void dispatch(fetchCheckCartAction(payload)),
        // MarkerGen function
    };
};

export function* watchCart(): SagaIterator {
    yield all([
        call(
        // MarkerGen watchers
            watchFetchCheckCart,
        ),
    ]);
}
