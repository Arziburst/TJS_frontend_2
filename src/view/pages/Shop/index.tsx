// Core
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

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

// Containers
import { MoveUnderline, NotData } from '@/view/containers';

// Components
import { ErrorBoundary, Icons, CardItem } from '@/view/components';
import { Select } from './Select';
import { Label } from './Label';
import { NavItemText } from '@/view/components/Nav/NavItem/NavItemText';

// Elements
import { Button, NavLink } from '@/view/elements';

// Static
import {
    ARRAY_FILTERS_BY_PRICE,
    ENUM_FILTERS_BY_PRICE,
    getValueOfSelectFilterByPrice,
    sortByPrice,
} from './static';

// Styles
import SCardItem from '@/view/components/CardItem/styles.module.css';

// Types
import { ExtendedProduct } from '@/bus/products/types';
import { SelectItem } from '@/view/components/Select/SelectItem';
import { cn } from '@/tools/lib/utils';

type PropTypes = {
    /* type props here */
}

const S = {
    common_gap: 'gap-8',
};

const Shop: FC<PropTypes> = () => {
    const { category } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const navigate = useNavigate();

    const [ width ] = useWindowWidth();

    const [ isFirstVisitState, setIsFirstVisitState ] = useState(true);
    const [
        filterByCategoryState,
        setFilterByCategoryState,
    ] = useState<string>(category || ENUM_CATEGORIES.ALL); // for Select category
    const [
        filteredProductsState,
        setFilteredProductsState,
    ] = useState<null | ExtendedProduct[]>(null);

    const { togglesRedux: { isLoggedIn, isFilterByLowToHigh }, setToggleAction } = useTogglesRedux();
    const { profile: { profile }} = useProfile();
    const { products: { products, isLoadings }, fetchProducts } = useProducts();

    const onClickEditItem = (id: string) => {
        navigate(`${BOOK.ITEM}/${id}${BOOK.MANAGEMENT}`);
    };

    const onClickItemsOfSelectFilterByPrice = (item: string) => {
        if (item === ENUM_FILTERS_BY_PRICE.LOW_TO_HIGH) {
            setToggleAction({
                type:  'isFilterByLowToHigh',
                value: true,
            });
        } else {
            setToggleAction({
                type:  'isFilterByLowToHigh',
                value: false,
            });
        }
    };

    // init
    useEffect(() => {
        fetchProducts();

        return () => {
            console.log('text');
            setToggleAction({
                type:  'isFilterByLowToHigh',
                value: null,
            });
        };
    }, []);

    // step 1
    useEffect(() => {
        setFilterByCategoryState(category || ENUM_CATEGORIES.ALL);
    }, [ category ]);

    // Select // navigate another category
    useEffect(() => {
        if (!isFirstVisitState) {
            if (filterByCategoryState && filterByCategoryState !== ENUM_CATEGORIES.ALL) {
                navigate(`${BOOK.SHOP}/${filterByCategoryState}`);
            } else {
                navigate(`${BOOK.SHOP}`);
            }
        } else {
            setIsFirstVisitState(false);
        }
    }, [ filterByCategoryState ]);

    // 1 lvl filter
    useEffect(() => {
        if (products && category) {
            const filletedProducts = products.filter((product) => product.type === category);
            setFilteredProductsState(sortByPrice({
                array: filletedProducts,
                isFilterByLowToHigh,
            }));
        } else {
            setFilteredProductsState(sortByPrice({
                array: products,
                isFilterByLowToHigh,
            }));
        }
    }, [ products, category, isFilterByLowToHigh ]);

    return (
        <div className = { `flex flex-col ${S.common_gap} 
            sb:flex-row sb:gap-20` }>
            <div>
                {width < SCREENS_NUMBER.SB ? (
                    <div className = { `flex gap-4 
                        [&>*]:w-1/2
                        max-[360px]:flex-col 
                        max-[360px]:[&>*]:w-full` }>
                        <Select
                            items = { [ ENUM_CATEGORIES.ALL, ...CATEGORIES_ITEMS ] }
                            label = 'Shop by'
                            setValue = { setFilterByCategoryState }
                            showValue = { filterByCategoryState }
                            value = { filterByCategoryState }
                        />
                        <Select
                            items = { ARRAY_FILTERS_BY_PRICE }
                            label = 'Filter by'
                            placeholder = 'select filter'
                            setValue = { onClickItemsOfSelectFilterByPrice }
                            showValue = { getValueOfSelectFilterByPrice(isFilterByLowToHigh) }
                            value = { getValueOfSelectFilterByPrice(isFilterByLowToHigh) }
                        />
                    </div>
                ) : (
                    <div className = 'flex flex-col gap-8'>
                        <ul className = 'flex flex-col gap-5'>
                            <li>
                                <Label className = 'capitalize'>
                                    Shop by
                                </Label>
                            </li>
                            {[ ENUM_CATEGORIES.ALL, ...CATEGORIES_ITEMS ].map((item) => (
                                <li
                                    className = 'leading-none'
                                    key = { item }>
                                    <MoveUnderline
                                        asChild
                                        variant = 'skipFirstLine'>
                                        <NavLink
                                            to = { `${BOOK.SHOP}/${item === ENUM_CATEGORIES.ALL ? '' : item}` }
                                            variant = 'default'>
                                            <NavItemText className = 'text-[15px]'>
                                                {item.replace('-', ' ')}
                                            </NavItemText>
                                        </NavLink>
                                    </MoveUnderline>
                                </li>
                            ))}
                        </ul>
                        <ul className = 'flex flex-col gap-5'>
                            <li>
                                <Label className = 'capitalize'>
                                    filter by
                                </Label>
                            </li>
                            {ARRAY_FILTERS_BY_PRICE.map((str, index) => (
                                <li>
                                    <MoveUnderline
                                        asChild
                                        variant = 'skipFirstLine'>
                                        <Button
                                            className = { cn(
                                                `font-secondary text-xs text-[13px] font-semibold whitespace-nowrap capitalize
                                                    hover:text-quaternary`,
                                                { 'text-quaternary': typeof isFilterByLowToHigh === 'boolean' &&  Boolean(index) !== isFilterByLowToHigh },
                                            ) }
                                            variant = 'default'
                                            onClick = { () => setToggleAction({
                                                type:  'isFilterByLowToHigh',
                                                value: str === ENUM_FILTERS_BY_PRICE.LOW_TO_HIGH,
                                            }) }>
                                            {str}
                                        </Button>
                                    </MoveUnderline>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className = { `flex flex-col ${S.common_gap} grow justify-between
                sb:gap-14` }>
                <NotData
                    className = { `flex flex-wrap gap-[14px] justify-center
                    sb:gap-[20px]` }
                    count = { profile?.role === 'admin' ? 2 : 1 }
                    isLoading = { isLoadings.products }>
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
                </NotData>
                <div className = { S.common_gap }>
                    <button>Add to Cart</button>
                    <div className = { `flex flex-col gap-4
                        sb:${S.common_gap}` }>
                        <p>Showed 20 from 440 products</p>
                        <div>
                            pagination
                        </div>
                    </div>
                </div>
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
