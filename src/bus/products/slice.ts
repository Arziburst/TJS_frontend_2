// Core
import { createSlice } from '@reduxjs/toolkit';

// Common
import { commonInitialState } from '../common';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers

const initialState: types.ProductsState = {
    ...commonInitialState,
    isLoadings: {
        products:       false,
        create:         false,
        incrementViews: false,
        edit:           false,
        delete:         false,
    },
    products:       null,
    currentProduct: null,
};

export const productsSlice = createSlice<types.ProductsState, typeof reducers>({
    name: 'products',
    initialState,
    reducers,
    // MarkerGen use extraReducers
});

export const sliceName = productsSlice.name;
export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
