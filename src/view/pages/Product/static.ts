// Types
import { CartState } from '@/bus/cart/types';

type CheckIsProductAddedToCart = {
    cart: CartState;
    id: string | undefined;
}

export const checkIsProductAddedToCart = ({ cart, id }: CheckIsProductAddedToCart) => {
    if (cart && id && cart.includes(id)) {
        return true;
    }

    return false;
};
