// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Book
import { BOOK, PARAMS } from './book';

// Pages
import * as Pages from '../pages';
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
                element = { <Pages.Contacts /> }
                path = { BOOK.CONTACTS }
            />
            <Route
                element = { <Pages.About /> }
                path = { BOOK.ABOUT }
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
