// ESLint
/* eslint-disable array-bracket-newline */

// Middlewares
import { Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// MarkerGen import Saga or Thunk
import createSagaMiddleware from 'redux-saga';

const isDev = process.env.NODE_ENV === 'development';

// Middlewares
import { localStorageMiddleware } from './localStorageMiddleware';
// MarkerGen sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [
    // MarkerGen use middleware Saga or Thunk
    sagaMiddleware,
    localStorageMiddleware,
];

isDev && middleware.push(
    createLogger({
        duration:  true,
        collapsed: true,
        colors:    {
            title:     () => '#139BFE',
            prevState: () => '#1C5FAF',
            action:    () => '#149945',
            nextState: () => '#A47104',
            error:     () => '#ff0005',
        },
    }),
);

export {
    middleware,
    // MarkerGen export sagaMiddleware
    sagaMiddleware,
};
