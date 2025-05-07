import classNames from 'classnames';
import styles from './cart-item.module.scss';

import { ChangeEvent } from 'react';
import commonStyles from '../../../styles/common-styles.module.scss';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useRemoveFromCart, useUpdateProductQuantityInCart } from '/src/api/api-client-hooks';

export interface CartItemProps {
    className?: string;
    isLast?: boolean;
    name?: string;
    imageUrl?: string;
    price?: number;
    quantity?: number;
    cartId?: number;
    productId?: number;
}

export const CartItem = ({ productId, name, imageUrl, price, quantity, cartId, className, isLast }: CartItemProps) => {

    const { error: updateProductQuantityError, updateProductQuantity } = useUpdateProductQuantityInCart();
    const { error: removeFromCartError, removeFromCart} = useRemoveFromCart();

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    async function updateQuantityHandler(e: ChangeEvent<HTMLInputElement>) {
        if(cartId !== undefined && productId !== undefined){
            await updateProductQuantity({cartId: cartId, productId: productId, quantity: parseInt(e.target.value)});

        }
    }
        
    async function removeFromCartHandler(){
        if(cartId !== undefined && productId !== undefined){
            await removeFromCart({cartId: cartId, productId: productId});
        }
    }

    return (
        <div className={classNames(styles.root, { [styles.divider]: !isLast }, className)}>
            <img src={`${apiBaseUrl}/api/v1/public/product/image/${imageUrl}`} alt={name || ''} className={styles.image} />
            <div className={styles.infoContainer}>
                <div className={styles['item-line']}>
                    <div>
                        <h4 className={styles.description}>{name}</h4>
                        <span className={commonStyles.price}>
                            {price}
                        </span>
                    </div>
                    <button
                        onClick={removeFromCartHandler}
                        aria-label="Remove item"
                        className={styles.remove}
                    >
                        <Cross2Icon height={20} width={18} />
                    </button>
                </div>

                <div className={styles.actionsContainer}>
                    <input
                        type="number"
                        value={quantity}
                        onChange={updateQuantityHandler}
                        min={0}
                        className={commonStyles.numberInput}
                    />
                </div>
            </div>
        </div>
    );
};
