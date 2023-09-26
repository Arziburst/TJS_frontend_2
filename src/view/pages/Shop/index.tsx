// Core
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Book
import { ParamsLowerCase } from '@/view/routes/book';

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

const mockItems = Array.from({ length: 33 });

const Shop: FC<PropTypes> = () => {
    const { category } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const { togglesRedux: { isLoggedIn }} = useTogglesRedux();
    const { profile: { profile }} = useProfile();
    const { products, fetchProducts } = useProducts();
    // const { fetchProducts } = useProductsSaga();

    useEffect(() => {
        fetchProducts(); // todo fix error >>> localStorage.get is not a function
    }, []);

    useEffect(() => {
        console.log('products >>> ', products);
    }, [ products.products ]);


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
                        <NavLink to = { '/' }>
                            <Button
                                className = 'h-full'
                                variant = 'default'>
                                <Icons.AddItem className = 'h-24 w-auto [&_path]:stroke-secondary-100' />
                            </Button>
                        </NavLink>

                    </div>
                )}
                {mockItems.map((item, index) => (
                    <CardItem
                        firstImage = {{
                            src: 'assets/test.png',
                            alt: 'test',
                        }}
                        key = { index }
                        name = { `name_${index}` }
                        price = { index * 100 }
                        secondImage = {{
                            src: 'assets/image_category_see_all.png',
                            alt: 'test',
                        }}
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
