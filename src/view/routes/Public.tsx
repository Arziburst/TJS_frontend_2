// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import * as Pages from '../pages';

// Tools
import * as BOOK from './book';

export const Public: FC = () => {
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
                path = { BOOK.SHOP + BOOK.PARAMS.CATEGORY }
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
