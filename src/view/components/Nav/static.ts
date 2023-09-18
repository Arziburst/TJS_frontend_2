// BOOK
import  { BOOK } from '@/view/routes/book';

export const NAV_LEFT = [ BOOK.SHOP ];

export const NAV_RIGHT = [ BOOK.CONTACTS, BOOK.ABOUT ];

export const NAV_COMMON = [ ...NAV_LEFT, ...NAV_RIGHT ];
