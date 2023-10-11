// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '@/view/components';

// Types
import { ParamsLowerCase } from '@/view/routes/book';

type PropTypes = {
    /* type props here */
}

const Product: FC<PropTypes> = () => {
    const { id } = useParams<Pick<ParamsLowerCase, 'id'>>();

    return (
        <div>
            Page: Product {id}
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Product />
    </ErrorBoundary>
);
