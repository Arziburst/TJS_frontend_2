// Init
import { API_URL } from '../init';

// Types
import { ExtendedProduct } from '../bus/products/types';

export const API = {
    PRODUCTS:        `${API_URL}/products`,
    PRODUCT:         (_id: ExtendedProduct['_id']) => `${API_URL}/products${_id}`,
    INCREMENT_VIEWS: (_id: ExtendedProduct['_id']) => `${API_URL}/products/incrementViews/${_id}`,
};

export const HEADERS = {
    'Content-Type': 'application/json',
};
