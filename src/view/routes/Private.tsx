// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Book
import { BOOK, PARAMS } from './book';

// Pages
import * as Pages from '../pages';

export const Private: FC = () => {
    return (
        <Routes>
            <Route
                element = { <Pages.Root /> }
                path = { BOOK.ROOT }
            />
            <Route
                element = { <Pages.Shop /> }
                path = { BOOK.SHOP }
            />
            <Route
                element = { <Pages.Shop /> }
                path = { BOOK.SHOP + PARAMS.CATEGORY }
            />
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
                path = { BOOK.ITEM + PARAMS.ID + BOOK.MANAGEMENT }
            />
            <Route
                element = { <Pages.Item /> }
                path = { BOOK.ITEM }
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
