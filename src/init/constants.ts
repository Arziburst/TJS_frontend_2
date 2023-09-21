// Network
export const API_URL = process.env.API_URL || 'http://localhost:4000';

// Local
export const APP_NAME = process.env.APP_NAME || 'burst-template';

export enum LOCAL_STORAGE {
    VIEWED_PRODUCTS = 'viewedProducts',
    CART = 'cart',
}

export enum ENUM_CATEGORIES {
    ALL = 'see-all',
    BROOCH = 'brooch',
    EARRING = 'earring',
    BESTSELLERS = 'bestsellers',
    BRACELETS = 'bracelets',
    NECKLACE = 'necklace',
    RINGS = 'rings',
}

export const CATEGORIES_ITEMS = [
    ENUM_CATEGORIES.BROOCH,
    ENUM_CATEGORIES.EARRING,
    ENUM_CATEGORIES.BESTSELLERS,
    ENUM_CATEGORIES.BRACELETS,
    ENUM_CATEGORIES.NECKLACE,
    ENUM_CATEGORIES.RINGS,
];

export const LANGUAGES = [ 'en', 'ua', 'ru' ];

export const LINK_GOHARD = 'https://gohard.team/';

export const LINK_INSTAGRAM = 'https://www.instagram.com/';

export enum CSS_VARIABLES {
    HEADER = '--vh_header',
}
