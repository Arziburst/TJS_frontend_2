// Core
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

import SCardItem from '@/view/components/CardItem/styles.module.css';

// Types
type PropTypes = {
    /* type props here */
}

const Shop: FC<PropTypes> = () => {
    const { category } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const navigate = useNavigate();

    const { togglesRedux: { isLoggedIn }} = useTogglesRedux();
    const { profile: { profile }} = useProfile();
    const { products: { products }, fetchProducts } = useProducts();

    const onClickEditItem = (id: string) => {
        navigate(`${BOOK.ITEM}/${id}${BOOK.MANAGEMENT}`);
    };

    useEffect(() => {
        fetchProducts(); // todo fix error >>> localStorage.get is not a function
    }, []);

    useEffect(() => {
        console.log('products >>> ', products);
    }, [ products ]);


    useEffect(() => {
        console.log('category >>> ', category);
    }, [ category ]);

    return (
        <div>
            <div>
                {/* <Select.Root>
                    <Select.SelectTrigger
                        isArrow
                        variant = 'ghost'>
                        <Select.SelectValue
                            placeholder = 'EN'
                        />
                    </Select.SelectTrigger>
                    <Select.SelectContent variant = 'ghost'>
                        {[ '1', '2', '3' ].map((language) => (
                            <Select.SelectItem
                                key = { language }
                                value = { language }>
                                {language.toUpperCase()}
                            </Select.SelectItem>
                        ))}
                    </Select.SelectContent>
                </Select.Root> */}
                filters
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
                {products?.map((item) => (
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
