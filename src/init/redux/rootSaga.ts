// Core
// Uncomment for using
import { all } from 'redux-saga/effects';

// MarkerGen tools imports
import { watchProducts } from '../../bus/products/saga';

export function* rootSaga() {
    // Uncomment for using
    yield all([
        // MarkerGen use watch
        watchProducts(),
    ]);
}
