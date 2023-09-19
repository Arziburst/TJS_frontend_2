// Init
import { API_URL } from '../init';

// Types
import { ExtendedProduct } from '../bus/products/types';

export const API = {
    PRODUCTS: {
        PRODUCTS:        `${API_URL}/products`,
        PRODUCT:         (_id: ExtendedProduct['_id']) => `${API_URL}/products${_id}`,
        INCREMENT_VIEWS: (_id: ExtendedProduct['_id']) => `${API_URL}/products/incrementViews/${_id}`,
    },
    PROFILE: {
        REGISTRATION: `${API_URL}/profile/registration`,
        LOGIN:        `${API_URL}/profile/login`,
        REFRESH:      `${API_URL}/profile/refresh`,
    },

};

export const HEADERS = {
    'Content-Type': 'application/json',
};
