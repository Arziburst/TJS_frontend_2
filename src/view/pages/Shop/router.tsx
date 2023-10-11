// Core
import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Bus
import { useProducts } from '@/bus/products';
import { useTogglesRedux } from '@/bus/client/toggles';

// Types
type PropTypes = {
    /* type props here */
}

export const ContainerShop: FC<PropTypes> = () => {
    const { setToggleAction } = useTogglesRedux();
    const { resetProducts } = useProducts();

    useEffect(() => {
        return () => {
            resetProducts();
            setToggleAction({
                type:  'isFilterByLowToHigh',
                value: null,
            });
        };
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
};
