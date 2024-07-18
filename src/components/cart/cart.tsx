import commonStyles from '@styles/common-styles.module.scss';
import { useContext, useEffect } from 'react';
import { Drawer } from '../drawer/drawer';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import { CartItem } from './cart-item/cart-item';
import styles from './cart.module.scss';
import { CartOpenContext } from './cart-open-context';
import Classnames from 'classnames';
import { useCart } from '/src/api/api-client-hooks';

export interface CartProps {
    className?: string;
    initialIsOpen?: boolean;
}

export const Cart = ({ className, initialIsOpen }: CartProps) => {
    const { isOpen, setIsOpen } = useContext(CartOpenContext);
    const { cart } = useCart();
    const isEmpty = !cart?.cartDetailDtos || cart.cartDetailDtos.length === 0;

    useEffect(() => {
        if (initialIsOpen !== undefined) {
            setIsOpen(initialIsOpen);
        }
    }, [setIsOpen]);

   // const wixClient = useContext(WixAPIContext);

    async function checkout() {
       // const { success, url } = await wixClient.checkout();
      //  if (success && url) {
      //      window.location.href = url;
      //  } else if (!success) {
            alert('checkout is not configured');
      //  }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={CommonStyles_module.secondaryButton}>
                Cart
            </button>
            {isOpen ? (
                <Drawer title="Cart" onClose={() => setIsOpen(false)} initialIsOpen={initialIsOpen}>
                    {isEmpty ? (
                        <div className={styles.emptyCart}>Cart is empty</div>
                    ) : (
                        <div className={styles.cart}>
                            <div className={styles.items}>
                                {cart?.cartDetailDtos?.map((item) => (
                                    <CartItem key={item.id} cartItem={item} />
                                ))}
                            </div>
                            <div className={styles['subtotal-checkout']}>
                                <label className={styles['subtotal-label']}>
                                    <span>Subtotal:</span>
                                    {cart.totalAmount}
                                </label>
                                <button
                                    className={Classnames(
                                        CommonStyles_module.primaryButton,
                                        styles.checkout
                                    )}
                                    onClick={checkout}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </Drawer>
            ) : null }
        </>
    );
};
