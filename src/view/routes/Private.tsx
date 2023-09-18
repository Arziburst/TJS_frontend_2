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
                element = { <Pages.SignInAndUp /> }
                path = { BOOK.SIGN_IN_AND_UP }
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
