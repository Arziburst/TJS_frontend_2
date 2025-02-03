// Core
import { MutableRefObject, useEffect } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Images
import image_category_brooch from '@/assets/images/image_category_brooch.jpg';
import image_category_earrings from '@/assets/images/image_category_earrings.jpg';
import image_category_bracelets from '@/assets/images/image_category_bracelets.jpg';
import image_category_necklace from '@/assets/images/image_category_necklace.jpg';
import image_category_rings from '@/assets/images/image_category_rings.jpg';
import image_category_colars from '@/assets/images/image_category_colars.jpg';

// Init
import { ENUM_CATEGORIES } from '@/init';

// Types
type UseStatic = {
    width: number;
    refGrid: MutableRefObject<HTMLDivElement | null>;
}

type MakeJustifySelf = {
    index: number;
    width: number;
}

export const CATEGORIES_ITEMS_WITH_IMAGES = [
    {
        category: ENUM_CATEGORIES.EARRINGS,
        image:    image_category_earrings,
    },
    {
        category: ENUM_CATEGORIES.NECKLACE,
        image:    image_category_necklace,
    },
    {
        category: ENUM_CATEGORIES.BRACELETS,
        image:    image_category_bracelets,
    },
    {
        category: ENUM_CATEGORIES.CORALS,
        image:    image_category_colars,
    },
    {
        category: ENUM_CATEGORIES.RINGS,
        image:    image_category_rings,
    },
    {
        category: ENUM_CATEGORIES.BROOCH,
        image:    image_category_brooch,
    },
];

export const useStatic = ({
    width,
    refGrid,
}: UseStatic) => {
    useEffect(() => {
        if (refGrid && refGrid.current) {
            const CATEGORIES_ITEMS_MAPPED = CATEGORIES_ITEMS_WITH_IMAGES.map((_, index) => index); // [0, 1, 2, 3, 4]

            if (width > SCREENS_NUMBER.MD) { // desktop
                const newArray: number[] = [];


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
                const outputArray: string[] = [];
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
