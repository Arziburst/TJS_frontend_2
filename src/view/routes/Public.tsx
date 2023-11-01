// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Book
import { BOOK, PARAMS } from './book';

// Pages
import * as Pages from '../pages';

// Containers
import { ContainerShop } from '../pages/Shop/router';

export const Public: FC = () => {
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
                element = { <Pages.Contacts /> }
                path = { BOOK.CONTACTS }
            />
            <Route
                element = { <Pages.About /> }
                path = { BOOK.ABOUT }
            />
            <Route
                element = { <Pages.SignInAndUp /> }
                path = { BOOK.SIGN_IN_AND_UP }
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
