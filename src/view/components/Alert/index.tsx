// Core
import React, { FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { injectStyle } from 'react-toastify/dist/inject-style';
// injectStyle();


// Styles
import './styles.css';
// import S from './styles.module.css';

// Types
type PropTypes = {
    /* type props here */
}

export const Alert: FC<PropTypes> = ({ ...props }) => {
    // React.useEffect(() => {
    //     toast.error('error');
    // }, []);

    return (
        <ToastContainer
            autoClose = { 3000 }
            closeButton = { false }
            draggable = { false }
            position = 'top-center'
        />
    );
};
