// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Book
import { BOOK, PARAMS } from './book';

// Pages
import * as Pages from '../pages';

// Containers
import { ContainerShop } from '../pages/Shop/router';

export const Private: FC = () => {
    return (
        <Routes>
            <Route
                element = { <Pages.Root /> }
                path = { BOOK.ROOT }
            />
            <Route
                element = { <ContainerShop /> }
                path = { BOOK.SHOP }>
                <Route
                    element = { <Pages.Shop /> }
                    path = { BOOK.SHOP }
                />
                <Route
                    element = { <Pages.Shop /> }
                    path = { BOOK.SHOP + PARAMS.CATEGORY }
                />
            </Route>
            <Route
                element = { <Pages.Cart /> }
                path = { BOOK.CART }
            />
            <Route
                element = { <Pages.AboutUs /> }
                path = { BOOK.ABOUT_US }
            />
            <Route
                element = { <Pages.Management /> }
                path = { BOOK.ADD_ITEM }
            />
            <Route
                element = { <Pages.Management /> }
                path = { BOOK.PRODUCT + PARAMS.ID + BOOK.MANAGEMENT }
            />
            <Route
                element = { <Pages.Product /> }
                path = { BOOK.PRODUCT + PARAMS.ID }
            />
            <Route
                element = { <Pages.OrderDetails /> }
                path = { BOOK.ORDER_DETAILS }
            />

            <Route
                element = { <Pages.PaymentSuccess /> }
                path = { BOOK.PAYMENT_SUCCESS }
            />
            <Route
                element = { <Pages.PaymentFail /> }
                path = { BOOK.PAYMENT_FAIL }
            />
            <Route
                element = { <Pages.Orders /> }
                path = { BOOK.ORDERS }
            />
            <Route
                element = { <Pages.Order /> }
                path = { BOOK.ORDER + PARAMS.ID }
            />
            {/* MarkerGen route */}
            <Route
                element = {
                    <Navigate
                        replace
                        to = { BOOK.ROOT }
                    />
                }
                path = '*'
            />
        </Routes>
    );
};
