// Core
import React, { FC } from 'react';

// Elements
import { TitlePage } from '@/view/elements';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CartDetails: FC<PropTypes> = ({ ...props }) => {
    return (
        <div { ...props }>
            <TitlePage>cart</TitlePage>
            <input type = 'text' />
            <input type = 'text' />
            <input type = 'text' />
            <input type = 'text' />
        </div>
    );
};
