// Common
import { setIsLoading } from '../common';

// Types
import * as types from './types';

export const setGallery: types.BaseContact<types.Gallery> = (state, action) => {
    return {
        ...state,
        gallery: action.payload,
    };
};

export const setIsLoadingOfGallery: types.SetIsLoadingOfGalleryContact = setIsLoading;
