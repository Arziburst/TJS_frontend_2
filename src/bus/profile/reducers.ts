// Common
import { setIsLoading } from '../common';

// Types
import * as commonTypes from '../commonTypes';
import * as types from './types';

export const setProfile: types.BaseContact<types.Profile> = (state, action) => {
    return {
        ...state,
        profile: action.payload,
    };
};

export const setErrorOfProfile: types.BaseContact<commonTypes.Error | null> = (state, action) => ({
    ...state,
    error: action.payload,
});


export const setIsLoadingOfProfile: types.SetIsLoadingOfProfileContact = setIsLoading;
