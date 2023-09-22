// Core
import { MutableRefObject, useEffect } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Init
import { CATEGORIES_ITEMS } from '@/init';

// Types
type UseStatic = {
    width: number;
    refGrid: MutableRefObject<HTMLDivElement | null>;
}

type MakeJustifySelf = {
    index: number;
    width: number;
}

export const useStatic = ({
    width,
    refGrid,
}: UseStatic) => {
    useEffect(() => {
        if (refGrid && refGrid.current) {
            const CATEGORIES_ITEMS_MAPPED = CATEGORIES_ITEMS.map((_, index) => index); // [0, 1, 2, 3, 4]

            if (width > SCREENS_NUMBER.MD) { // desktop
                let newArray: number[] = [];


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

                refGrid.current.style.gridTemplate = result;
                refGrid.current.style.justifyContent = 'normal';
            } else { // mobile
                let outputArray: string[] = [];
                CATEGORIES_ITEMS_MAPPED.forEach((number) => {
                    outputArray.push(`g-${number}`);
                });

                const result = `"${outputArray.join('" "')}"`;

                refGrid.current.style.gridTemplate = result;
                refGrid.current.style.justifyContent = 'center';
            }
            if (width < 400) {
                refGrid.current.style.justifyContent = 'normal';
            }
        }
    }, [ refGrid, width ]);
};

export const makeJustifySelf = ({ index, width }: MakeJustifySelf): string => {
    if (width < SCREENS_NUMBER.MD + 1) {
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
