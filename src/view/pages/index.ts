// Core
import { lazy } from 'react';

// MarkerGen pages
export const Product = lazy(() => import(/* webpackChunkName: "Product" */ './Product'));
export const Management = lazy(() => import(/* webpackChunkName: "Management" */ './Management'));
export const SignInAndUp = lazy(() => import(/* webpackChunkName: "SignInAndUp" */ './SignInAndUp'));
export const About = lazy(() => import(/* webpackChunkName: "About" */ './About'));
export const Contacts = lazy(() => import(/* webpackChunkName: "Contacts" */ './Contacts'));
export const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './Cart'));
export const Shop = lazy(() => import(/* webpackChunkName: "Shop" */ './Shop'));
export const Root = lazy(() => import(/* webpackChunkName: "Root" */ './Root'));
