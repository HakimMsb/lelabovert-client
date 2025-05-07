import classNames from 'classnames';
import styles from './product-details-page.module.scss';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../router/config';
import commonStyles from '../../styles/common-styles.module.scss';
import { ProductImages } from './product-images/product-images';
import { ProductInfo } from './product-info/product-info';
import { useContext, useRef } from 'react';
import { useAddToCart, useProduct } from '../../api/api-client-hooks';
import { useAuth } from '/src/api/auth-context';
import { CartOpenContext } from '/src/components/cart/cart-open-context';

export interface ProductDetailsPageProps {
    className?: string;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ className }) => {
    const { setIsOpen } = useContext(CartOpenContext);
    const { slug: productSlug } = useParams<RouteParams['/product/:slug']>();

    if (!productSlug) {
        return (
            <div className={commonStyles.loading}>
                Product slug is not defined
            </div>
        );
    }

    const { product, loading, error } = useProduct(productSlug);
    const { error: addToCartError, addToCart} = useAddToCart();
    const quantityInput = useRef<HTMLInputElement>(null);
    const { userProfile } = useAuth();

    if (!product) {
        return (
            <div className={commonStyles.loading}>
                {loading ? 'Loading...' : 'The product is not found'}
            </div>
        );
    }

    if (error) {
        return <div className={commonStyles.loading}>Error: {error.message}</div>;
    }


    async function addToCartHandler() {
         if (!product?.id) {
             return;
         }
         const quantity = parseInt(quantityInput.current?.value || '1', 10);

         if (userProfile && userProfile.cartId !== undefined) {
            await addToCart({ cartId: userProfile.cartId, productId: product.id, quantity: quantity });
        }
         
         setIsOpen(true);
     }

    return (
        <div className={classNames(styles.root, className)}>
            {<ProductImages
                name={product?.name}
                imageUrl={product?.image}
                className={styles.left}
            />}
            <div className={styles.right}>
                <div>{product.name}</div>
                {product.price && (
                    <div className={commonStyles.price}>{product.price}</div>
                )}

                <div className={styles.addToCart}>
                    <label>
                        Quantity: <br />
                        <input
                            ref={quantityInput}
                            className={classNames(commonStyles.numberInput, styles.quantity)}
                            type="number"
                            min={1}
                            placeholder="1"
                        />
                    </label>
                    <button
                        onClick={addToCartHandler}
                        className={classNames(commonStyles.primaryButton, styles.addToCartBtn)}
                    >
                        Add to Cart
                    </button>
                </div>
                <ProductInfo
                    className={styles.productInfo}
                    productInfo={product.description}
                />
            </div>
        </div>
    );
};
