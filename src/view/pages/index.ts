// Core
import { lazy } from 'react';

// MarkerGen pages
export const Order = lazy(() => import(/* webpackChunkName: "Order" */ './Order'));
export const Orders = lazy(() => import(/* webpackChunkName: "Orders" */ './Orders'));
export const PaymentFail = lazy(() => import(/* webpackChunkName: "PaymentFail" */ './PaymentFail'));
export const PaymentSuccess = lazy(() => import(/* webpackChunkName: "PaymentSuccess" */ './PaymentSuccess'));
export const OrderDetails = lazy(() => import(/* webpackChunkName: "OrderDetails" */ './OrderDetails'));
export const Product = lazy(() => import(/* webpackChunkName: "Product" */ './Product'));
export const Management = lazy(() => import(/* webpackChunkName: "Management" */ './Management'));
export const SignInAndUp = lazy(() => import(/* webpackChunkName: "SignInAndUp" */ './SignInAndUp'));
export const AboutUs = lazy(() => import(/* webpackChunkName: "AboutUs" */ './AboutUs'));
export const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './Cart'));
export const Shop = lazy(() => import(/* webpackChunkName: "Shop" */ './Shop'));
export const Root = lazy(() => import(/* webpackChunkName: "Root" */ './Root'));
