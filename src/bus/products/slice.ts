// Core
import { createSlice } from '@reduxjs/toolkit';

// Common
import { commonInitialState } from '../common';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers

export const initialState: types.ProductsState = {
    ...commonInitialState,
    isLoadings: {
        fetchProducts:      false,
        fetchProductsAtEnd: false,
        create:             false,
        incrementViews:     false,
        edit:               false,
        delete:             false,
    },
    limit:          20,
    page:           1,
    totalShowed:    0,
    total:          0,
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
