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
export const SIGN_IN_AND_UP = '/sign-in-and-up';
export const ABOUT = '/about';
export const CONTACTS = '/contacts';
export const CART = '/cart';
export const SHOP = '/shop';
export const ROOT = '/';
