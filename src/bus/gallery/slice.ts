// Core
import { createSlice } from '@reduxjs/toolkit';

// Common
import { commonInitialState } from '../common';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers

const initialState: types.GalleryState = {
    ...commonInitialState,
    isLoadings: {
        gallery: false,
        delete:  false,
    },
    gallery: null,
};

export const gallerySlice = createSlice<types.GalleryState, typeof reducers>({
    name: 'gallery',
    initialState,
    reducers,
    // MarkerGen use extraReducers
});

export const sliceName = gallerySlice.name;
export const galleryActions = gallerySlice.actions;
export default gallerySlice.reducer;
