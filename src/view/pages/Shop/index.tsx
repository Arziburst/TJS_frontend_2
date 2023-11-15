// Core
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { cn } from '@/tools/lib/utils';

// Init
import { CATEGORIES_ITEMS, ENUM_CATEGORIES } from '@/init';

// Hooks
import { useCustomTranslation, useWindowWidth } from '@/tools/hooks';

// Book
import { BOOK, ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useProfile } from '@/bus/profile';
import { useProducts } from '@/bus/products';

// Containers
import { MoveUnderline, NotData } from '@/view/containers';

// Components
import { ErrorBoundary, Icons, CardItem, Pagination } from '@/view/components';
import { Select } from './Select';
import { Label } from './Label';
import { NavItemText } from '@/view/components/Nav/NavItem/NavItemText';

// Elements
import { Button, NavLink, TitlePage } from '@/view/elements';

// Static
import {
    ARRAY_FILTERS_BY_PRICE,
    ENUM_FILTERS_BY_PRICE,
    getValueOfSelectFilterByPrice,
} from './static';

// Styles
import SCardItem from '@/view/components/CardItem/styles.module.css';

// Types
type PropTypes = {
    /* type props here */
}

const S = {
    common_gap:    'gap-[32px]',
    sb_common_gap: 'sb:gap-[32px]',
    semibold:      'font-semibold',
};

const Shop: FC<PropTypes> = () => {
    const { category: categoryFromURL } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const { t } = useCustomTranslation();

    const navigate = useNavigate();

    const [ width ] = useWindowWidth();

    // Hooks of Bus
    const {
        togglesRedux: {
            isLoggedIn,
            isFilterByLowToHigh,
            isLoadingFetchProductsByPagination,
            isLoadingFetchProductsByPaginationAtEnd,
        },
        setToggleAction,
    } = useTogglesRedux();
    const { profile } = useProfile();
    const {
        products: {
            products,
            limit,
            total,
            totalShowed,
            page,
        },
        setPageOfProducts,
        fetchProductsByPagination,
        fetchProductsByPaginationAtEnd,
    } = useProducts();

    // States
    const [ localPageState, setLocalPageState ] = useState(page);
    const [
        filterByCategoryState,
        setFilterByCategoryState,
    ] = useState<string>(categoryFromURL || ENUM_CATEGORIES.ALL); // for Select category

    // Handlers
    const onClickEditItemHandler = (id: string) => {
        navigate(`${BOOK.PRODUCT}/${id}${BOOK.MANAGEMENT}`);
    };

    const onClickItemsOfSelectFilterByPriceHandler = (item: string) => {
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

    const onClickShowMoreHandler = () => {
        const rightPage = localPageState + 1;
        setLocalPageState(rightPage);
        fetchProductsByPaginationAtEnd({
            limit:       limit,
            type:        categoryFromURL || ENUM_CATEGORIES.ALL,
            page:        rightPage,
            isLowToHigh: isFilterByLowToHigh,
        });
    };

    // init
    useEffect(() => {
        setFilterByCategoryState(categoryFromURL || ENUM_CATEGORIES.ALL);
        fetchProductsByPagination({
            limit,
            type:        categoryFromURL || ENUM_CATEGORIES.ALL,
            page,
            isLowToHigh: isFilterByLowToHigh,
        });
    }, [ categoryFromURL, limit, page, isFilterByLowToHigh ]);

    // step 1 // Select // navigate another category
    useEffect(() => {
        if (filterByCategoryState && filterByCategoryState !== ENUM_CATEGORIES.ALL) {
            navigate(`${BOOK.SHOP}/${filterByCategoryState}`);
        } else {
            navigate(`${BOOK.SHOP}`);
        }
    }, [ filterByCategoryState ]);

    useEffect(() => {
        setLocalPageState(page);
    }, [ categoryFromURL, isFilterByLowToHigh ]);

    useEffect(() => {
        setLocalPageState(page);
    }, [ page ]);

    return (
        <div className = { `flex flex-col ${S.common_gap} 
            sb:flex-row sb:gap-20` }>
            <div>
                {width < SCREENS_NUMBER.SB ? (
                    <div className = 'flex flex-col'>
                        {categoryFromURL && (
                            <TitlePage>
                                {t(`categories.${categoryFromURL}`)}
                            </TitlePage>
                        )}
                        <div className = { `flex gap-4
                            [&>*]:w-1/2
                            max-[360px]:flex-col 
                            max-[360px]:[&>*]:w-full` }>
                            <Select
                                items = { [ ENUM_CATEGORIES.ALL, ...CATEGORIES_ITEMS ] }
                                label = 'Shop by'
                                setValue = { setFilterByCategoryState }
                                showValue = { t(`categories.${filterByCategoryState}`) }
                                t = { t }
                                tString = 'categories'
                                value = { filterByCategoryState }
                            />
                            <Select
                                items = { ARRAY_FILTERS_BY_PRICE }
                                label = 'Filter by'
                                setValue = { onClickItemsOfSelectFilterByPriceHandler }
                                showValue = { t(`filtersByPrice.${getValueOfSelectFilterByPrice(isFilterByLowToHigh) }`) }
                                t = { t }
                                tString = 'filtersByPrice'
                                value = { getValueOfSelectFilterByPrice(isFilterByLowToHigh) }
                            />
                        </div>
                    </div>
                ) : (
                    <div className = 'flex flex-col gap-8'>
                        <ul className = 'flex flex-col gap-5'>
                            <li>
                                <Label className = 'capitalize'>
                                    {t('pages.shop.titleFilterShopBy')}
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
                                                {t(`categories.${item}`)}
                                            </NavItemText>
                                        </NavLink>
                                    </MoveUnderline>
                                </li>
                            ))}
                        </ul>
                        <ul className = 'flex flex-col gap-5'>
                            <li>
                                <Label className = 'capitalize'>
                                    {t('pages.shop.titleFilterByPrice')}
                                </Label>
                            </li>
                            {ARRAY_FILTERS_BY_PRICE.map((str, index) => (
                                <li key = { str }>
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
                                            {t(`filtersByPrice.${str}`)}
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
                    firstElement = { isLoggedIn && profile?.role === 'admin' && (
                        <div className = { SCardItem.images_container }>
                            <NavLink to = { BOOK.ADD_ITEM }>
                                <Button
                                    className = 'h-full'
                                    variant = 'default'>
                                    <Icons.AddItem className = 'h-24 w-auto [&_path]:stroke-secondary-100' />
                                </Button>
                            </NavLink>

                        </div>
                    ) }
                    isLoading = { isLoadingFetchProductsByPagination }
                    t = { t }>
                    {products?.map((item) => (
                        <CardItem
                            _id = { item._id }
                            available = { item.available }
                            firstImage = {{
                                src: item.images[ 0 ],
                                alt: t('cards.product.firstAltImageOfCard'),
                            }}
                            key = { item._id }
                            price = { item.price }
                            role = { profile?.role }
                            secondImage = {{
                                src: item.images[ 1 ],
                                alt: t('cards.product.secondAltImageOfCard'),
                            }}
                            t = { t }
                            title = { item.title }
                            to = { `${BOOK.PRODUCT}/${item._id}` }
                            onClickEditItem = { () => onClickEditItemHandler(item._id) }
                        />
                    ))}
                </NotData>
                <div className = { `flex flex-col gap-4 items-center
                    ${S.sb_common_gap}` }>
                    {totalShowed < total && (
                        <NotData
                            className = 'w-full flex justify-center'
                            isLoading = { isLoadingFetchProductsByPaginationAtEnd }
                            t = { t }>
                            <Button
                                className = 'capitalize max-w-[540px]'
                                onClick = { onClickShowMoreHandler }>
                                {t('pages.shop.buttonShowMore')}
                            </Button>
                        </NotData>
                    )}
                    <p className = { `text-xs font-secondary tracking-[0.24px]
                        sb:text-sm sb:tracking-[0.28px]` }>
                        {t('pages.shop.textShowed')}
                        <span className = { S.semibold }>
                            {` ${totalShowed} `}
                        </span>
                        {t('pages.shop.textFrom')}
                        <span className = { S.semibold }>
                            {' ' + total + ' '}
                        </span>
                        {t('pages.shop.textProducts')}
                    </p>
                    <Pagination
                        array = { products }
                        className = 'w-full'
                        limit = { limit }
                        setValue = { (value: number) => setPageOfProducts(value) }
                        total = { total }
                        value = { page }
                        onClickDesktopNumber = { () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }
                    />
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
