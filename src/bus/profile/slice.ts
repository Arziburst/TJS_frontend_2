// Core
import { createSlice } from '@reduxjs/toolkit';

// Common
import { commonInitialState } from '../common';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers

export const initialState: types.ProfileState = {
    ...commonInitialState,
    isLoadings: {
        profile: false,
        logout:  false,
    },
    profile: null,
};

export const profileSlice = createSlice<types.ProfileState, typeof reducers>({
    name: 'profile',
    initialState,
    reducers,
    // MarkerGen use extraReducers
});

export const sliceName = profileSlice.name;
export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
