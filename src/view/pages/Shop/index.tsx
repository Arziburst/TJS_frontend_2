// Core
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Init
import { CATEGORIES_ITEMS, ENUM_CATEGORIES } from '@/init';

// Hooks
import { useWindowWidth } from '@/tools/hooks';

// Book
import { BOOK, ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useProfile } from '@/bus/profile';
import { useProducts } from '@/bus/products';

// Components
import { ErrorBoundary, Icons, CardItem, Select } from '@/view/components';

// Elements
import { Button, NavLink } from '@/view/elements';

// Static
import { ARRAY_FILTERS_BY_PRICE, ENUM_FILTERS_BY_PRICE, sortByPriceHighToLow, sortByPriceLowToHigh } from './static';

// Styles
import SCardItem from '@/view/components/CardItem/styles.module.css';

// Types
import { ExtendedProduct } from '@/bus/products/types';
import { SCREENS_NUMBER } from '@/assets';
import { SelectShop } from './Select';

type PropTypes = {
    /* type props here */
}

const Shop: FC<PropTypes> = () => {
    const { category } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const navigate = useNavigate();

    const [ width ] = useWindowWidth();

    const [
        filterByCategoryState,
        setFilterByCategoryState,
    ] = useState<string>(category || ENUM_CATEGORIES.ALL);
    const [
        filteredProductsState,
        setFilteredProductsState,
    ] = useState<null | ExtendedProduct[]>(null);

    const [ filteredByPriceState, setFilteredByPriceState ] = useState<null | string>(null);

    const { togglesRedux: { isLoggedIn }} = useTogglesRedux();
    const { profile: { profile }} = useProfile();
    const { products: { products }, fetchProducts } = useProducts();

    const onClickEditItem = (id: string) => {
        navigate(`${BOOK.ITEM}/${id}${BOOK.MANAGEMENT}`);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setFilterByCategoryState(category || ENUM_CATEGORIES.ALL);
    }, [ category ]);

    useEffect(() => {
        if (filterByCategoryState && filterByCategoryState !== ENUM_CATEGORIES.ALL) {
            navigate(`${BOOK.SHOP}/${filterByCategoryState}`);
        } else {
            navigate(`${BOOK.SHOP}`);
        }
    }, [ filterByCategoryState ]);

    useEffect(() => {
        if (products && category) {
            const filletedProducts = products.filter((product) => product.type === category);
            setFilteredProductsState(filletedProducts);
        } else {
            setFilteredProductsState(products);
        }
    }, [ products, category ]);

    useEffect(() => {
        if (filteredProductsState) {
            if (filteredByPriceState === ENUM_FILTERS_BY_PRICE.LOW_TO_HIGH) {
                const sortedByPriceLowToHigh = sortByPriceLowToHigh(filteredProductsState);
                setFilteredProductsState(sortedByPriceLowToHigh);
            } else {
                const sortedByPriceHighToLow = sortByPriceHighToLow(filteredProductsState);
                setFilteredProductsState(sortedByPriceHighToLow);
            }
        }
    }, [ filteredByPriceState ]);

    return (
        <div className = { `flex flex-col gap-8
            sb:flex-row sb:gap-20` }>
            <div>
                {width < SCREENS_NUMBER.SB && (
                    <div className = { `flex gap-4 
                        [&>*]:w-1/2
                        max-[360px]:flex-col 
                        max-[360px]:[&>*]:w-full` }>
                        <SelectShop
                            items = { [ ENUM_CATEGORIES.ALL, ...CATEGORIES_ITEMS ] }
                            label = 'Shop by'
                            setValue = { setFilterByCategoryState }
                            showValue = { filterByCategoryState }
                            value = { filterByCategoryState }
                        />
                        <SelectShop
                            items = { ARRAY_FILTERS_BY_PRICE }
                            label = 'Filter by'
                            placeholder = 'select filter'
                            setValue = { setFilteredByPriceState }
                            showValue = { filteredByPriceState }
                            value = { filteredByPriceState }
                        />
                    </div>
                    // <div className = 'flex flex-col gap-[10px]'>
                    //     <p className = 'text-sm text-[15px] font-secondary font-semibold opacity-50'>
                    //         Shop by
                    //     </p>
                    //     <Select.Root
                    //         value = { filterByCategoryState }
                    //         onValueChange = { setFilterByCategoryState }>
                    //         <Select.SelectTrigger
                    //             isArrow
                    //             className = 'capitalize'
                    //             variant = 'ghost'>
                    //             <Select.SelectValue
                    //                 aria-label = { filterByCategoryState }
                    //                 className = 'text=[15px]'>
                    //                 {filterByCategoryState || ENUM_CATEGORIES.ALL}
                    //             </Select.SelectValue>
                    //         </Select.SelectTrigger>
                    //         <Select.SelectContent variant = 'outline'>
                    //             {[ ENUM_CATEGORIES.ALL, ...CATEGORIES_ITEMS ].map((category) => (
                    //                 <Select.SelectItem
                    //                     className = 'py-2 px-3 capitalize'
                    //                     key = { category }
                    //                     value = { category }
                    //                     onClick = { () => navigate('/') }>
                    //                     {category}
                    //                 </Select.SelectItem>
                    //             ))}
                    //         </Select.SelectContent>
                    //     </Select.Root>
                    // </div>
                )}
            </div>
            <div className = { `flex flex-wrap gap-[14px] justify-center
                sb:gap-[20px]` }>
                {isLoggedIn && profile?.role === 'admin' && (
                    <div className = { SCardItem.images_container }>
                        <NavLink to = { BOOK.ADD_ITEM }>
                            <Button
                                className = 'h-full'
                                variant = 'default'>
                                <Icons.AddItem className = 'h-24 w-auto [&_path]:stroke-secondary-100' />
                            </Button>
                        </NavLink>

                    </div>
                )}
                {filteredProductsState?.map((item) => (
                    <CardItem
                        firstImage = {{
                            src: item.images[ 0 ],
                            alt: 'First image of item',
                        }}
                        key = { item._id }
                        name = { item.title }
                        price = { item.price }
                        secondImage = {{
                            src: item.images[ 1 ],
                            alt: 'Second image of item',
                        }}
                        onClickEditItem = { () => onClickEditItem(item._id) }
                    />
                ))}
            </div>
            <div>
                <button>Add to Cart</button>
                <p>Showed 20 from 440 products</p>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Shop />
    </ErrorBoundary>
);


// item/4 // сторінка продукта
// item/4/management // сторінка редагування продукта
// item/add // сторінка додавання продукта
