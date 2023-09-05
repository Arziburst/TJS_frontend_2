// Types
import * as commonTypes from '../common';
import * as types from './types';

export const setProducts: types.BaseContact<types.Products> = (state, action) => ({
    ...state,
    items: action.payload,
});

export const setProduct: types.BaseContact<types.ExtendedProduct> = (state, action) => {
    if (state.items) {
        return {
            ...state,
            items: [ action.payload, ...state.items ],
        };
    }

    return {
        ...state,
        items: [ action.payload ],
    };
};

export const setDeleteProduct: types.BaseContact<string> = (state, action) => {
    if (state.items) {
        state.items.filter(({ _id }) => _id !== action.payload);
    }
};

export const setEditedProduct: types.BaseContact<types.ExtendedProduct> = (state, action) => {
    if (state.items) {
        const newItems = state.items.map((product) => {
            if (product._id === action.payload._id) {
                return {
                    ...product,
                    ...action.payload,
                };
            }

            return product;
        });

        return {
            ...state,
            items: newItems,
        };
    }

    return state;
};

export const setErrorOfProducts: types.BaseContact<commonTypes.Error> = (state, action) => ({
    ...state,
    error: action.payload,
});


export const setIsLoadingOfProducts: types.BaseContact<commonTypes.IsLoading> = (state, action) => ({
    ...state,
    isLoading: action.payload,
});
