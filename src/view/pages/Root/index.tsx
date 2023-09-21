// Core
import React, { FC, useEffect } from 'react';

// Init
import { CATEGORIES_ITEMS } from '@/init';

// Tools
import { cn } from '@/tools/lib/utils';

// Components
import { ErrorBoundary } from '@/view/components';

// Elements
import { LinkCategory } from './LinkCategory';
import { useWindowWidth } from '@/tools/hooks';

// Styles
import S from './styles.module.css';
import { SCREENS_NUMBER } from '@/assets';

const Root: FC = () => {
    const ref = React.useRef<null | HTMLDivElement>(null);

    const [ width ] = useWindowWidth();

    useEffect(() => {
        if (ref && ref.current) {
            let newArray: number[] = [];

            const CATEGORIES_ITEMS_MAPPED = [ ...CATEGORIES_ITEMS ].map((_, index) => index); // [0, 1, 2, 3, 4]

            CATEGORIES_ITEMS_MAPPED.forEach((item, index) => { // [0, 1,
                if (index === 0) {
                    newArray.push(index);

                    return;
                }
                if ((index + 1) % 3 === 0) {
                    newArray.push(index);
                    newArray.push(index);
                } else {
                    newArray.push(index);
                }
            });


            if (newArray.length % 2 !== 0) {
                newArray.splice(-2, 1);
            }

            const outputArray = [];

            for (let i = 0; i < newArray.length; i += 2) {
                const firstNumber = newArray[ i ]; // 5
                const secondNumber = newArray[ i + 1 ];
                const combinedNumbers = `g-${firstNumber} g-${secondNumber}`;
                outputArray.push(combinedNumbers);
            }

            const result = `"${outputArray.join('" "')}"`;

            ref.current.style.gridTemplate = result;
        }
    }, [ ref, width ]);

    const makeJustifySelf = (index: number): string => {
        if (width < SCREENS_NUMBER.SM) {
            return 'start';
        }

        if (index === 0) {
            return 'start';
        } else if (index === 1) {
            return 'end';
        }

        if ((index + 1) % 3 === 0) {
            return 'stretch';
        } else if ((index + 1) % 2 !== 0) {
            return 'end';
        }

        return 'start';
    };

    return (
        <div className = 'flex flex-col'>
            <div
                // className = { S.root }
                className = 'sm:grid gap-3'
                ref = { ref }>

                {CATEGORIES_ITEMS.map((category, index) => (
                    <div
                        className = 'flex justify-center'
                        style = {{ gridArea: `g-${index}`, justifySelf: makeJustifySelf(index) }}>
                        <LinkCategory
                            category = { category }
                            key = { category }
                            to = { 'sad' }
                        />
                    </div>
                ))}

            </div>
            <div className = 'grow'>
                {/* <p>footer</p> */}
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
