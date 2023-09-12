// Tools
import { LowercaseKeys } from '@/tools/utils';

// Types
type Params = {
    CATEGORY: string,
}
export type ParamsLowerCase = LowercaseKeys<Params>;

export const PARAMS: Params = {
    CATEGORY: '/:category',
};

// MarkerGen books
export const ABOUT = '/about';
export const CONTACTS = '/contacts';
export const CART = '/cart';
export const SHOP = '/shop';
export const ROOT = '/';
