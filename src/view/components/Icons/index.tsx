// Core
import React, { FC } from 'react';

// Types
interface PropTypes extends React.SVGProps<SVGSVGElement> {}

const SideBarClose: FC<PropTypes> = ({ ...props }) => {
    return (
        <svg
            { ...props }
            fill = 'none'
            height = '22'
            viewBox = '0 0 25 22'
            width = '25'
            xmlns = 'http://www.w3.org/2000/svg'>
            <rect
                fill = '#635A59'
                height = '1.58608'
                transform = 'matrix(0.756939 0.653486 -0.632016 0.774955 1.00244 0)'
                width = '31.5652'
            />
            <rect
                fill = '#635A59'
                height = '1.58608'
                transform = 'matrix(0.756939 -0.653486 0.632016 0.774955 0.104492 20.7705)'
                width = '31.5652'
            />
        </svg>
    );
};

const SideBarOpen: FC<PropTypes> = ({ ...props }) => {
    return (
        <svg
            { ...props }
            fill = 'none'
            height = '10'
            viewBox = '0 0 40 10'
            width = '40'
            xmlns = 'http://www.w3.org/2000/svg'>
            <rect
                fill = '#635A59'
                height = '2'
                width = '40'
            />
            <rect
                fill = '#635A59'
                height = '2'
                width = '30'
                x = '10'
                y = '8'
            />
        </svg>

    );
};

const Instagram: FC<PropTypes> = ({ ...props }) => {
    return (
        <svg
            { ...props }
            fill = 'none'
            height = '14'
            viewBox = '0 0 15 14'
            width = '15'
            xmlns = 'http://www.w3.org/2000/svg'>
            <path
                clipRule = 'evenodd'
                d = 'M10.5625 3.01975C10.5625 3.51072 10.9614 3.90877 11.4535 3.90877C11.9456 3.90877 12.3445 3.51072 12.3445 3.01975C12.3445 2.52875 11.9456 2.13071 11.4535 2.13071C10.9614 2.13071 10.5625 2.52875 10.5625 3.01975ZM5.01382 6.97442C5.01382 5.61052 6.12194 4.50488 7.48884 4.50488C8.85575 4.50488 9.96387 5.61052 9.96387 6.97442C9.96387 8.33829 8.85575 9.44392 7.48884 9.44392C6.12194 9.44392 5.01382 8.33829 5.01382 6.97442ZM7.48892 10.7791C5.38314 10.7791 3.67608 9.07578 3.67608 6.97468C3.67608 4.87357 5.38314 3.1703 7.48892 3.1703C9.59469 3.1703 11.3018 4.87357 11.3018 6.97468C11.3018 9.07578 9.59469 10.7791 7.48892 10.7791ZM13.5175 0.982485C13.2187 0.683701 12.9343 0.498659 12.5357 0.343782C12.2348 0.22683 11.7827 0.087753 10.9502 0.0497662C10.0499 0.00869428 9.77985 0 7.49998 0C5.22012 0 4.95007 0.00869428 4.0497 0.0497662C3.21723 0.087753 2.76512 0.22683 2.46425 0.343782C2.06569 0.498659 1.78127 0.683701 1.48248 0.982485C1.1837 1.28127 0.998659 1.56572 0.843751 1.96425C0.72683 2.26512 0.587753 2.71726 0.549766 3.54973C0.508694 4.45007 0.5 4.72012 0.5 6.99998C0.5 9.27988 0.508694 9.5499 0.549766 10.4503C0.587753 11.2827 0.72683 11.7349 0.843751 12.0357C0.998659 12.4343 1.1837 12.7187 1.48248 13.0175C1.78127 13.3163 2.06569 13.5013 2.46425 13.6562C2.76512 13.7731 3.21723 13.9122 4.04973 13.9502C4.94994 13.9913 5.21996 14 7.49998 14C9.78 14 10.05 13.9913 10.9502 13.9502C11.7827 13.9122 12.2348 13.7731 12.5357 13.6562C12.9343 13.5013 13.2187 13.3163 13.5175 13.0175C13.8163 12.7187 14.0013 12.4343 14.1562 12.0357C14.2731 11.7349 14.4122 11.2827 14.4502 10.4503C14.4913 9.5499 14.5 9.27988 14.5 6.99998C14.5 4.72012 14.4913 4.45007 14.4502 3.54973C14.4122 2.71726 14.2731 2.26512 14.1562 1.96425C14.0013 1.56572 13.8163 1.28127 13.5175 0.982485Z'
                fill = '#FF614A'
                fillRule = 'evenodd'
            />
        </svg>
    );
};

const AddItem: FC<PropTypes> = ({ ...props }) => {
    return (
        <svg
            { ...props }
            fill = 'none'
            height = '800px'
            viewBox = '0 0 48 48'
            width = '800px'
            xmlns = 'http://www.w3.org/2000/svg'>
            <path
                d = 'M24 32L24 16'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M42 27L42 21'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M6 27L6 21'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M14 6H8C6.89543 6 6 6.89543 6 8V14'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M34 6H40C41.1046 6 42 6.89543 42 8V14'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M34 42H40C41.1046 42 42 41.1046 42 40V34'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M14 42H8C6.89543 42 6 41.1046 6 40V34'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M27 6H21'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M32 24L16 24'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
            <path
                d = 'M27 42H21'
                stroke = '#000000'
                strokeLinecap = 'round'
                strokeLinejoin = 'round'
                strokeWidth = '4'
            />
        </svg>
    );
};

const DeleteItem: FC<PropTypes> = ({ ...props }) => {
    return (
        <svg
            { ...props }
            fill = 'none'
            height = '48'
            stroke = 'currentColor'
            strokeLinecap = 'round'
            strokeLinejoin = 'round'
            strokeWidth = '2'
            viewBox = '0 0 24 24'
            width = '48'
            xmlns = 'http://www.w3.org/2000/svg'><path d = 'M3 6h18' /><path d = 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' /><path d = 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
        </svg>
    );
};


export const Icons = {
    SideBarClose,
    SideBarOpen,
    Instagram,
    AddItem,
    DeleteItem,
};
