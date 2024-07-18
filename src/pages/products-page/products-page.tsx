import classNames from 'classnames';
import styles from './products-page.module.scss';
import { Link, useParams } from 'react-router-dom';
import { ROUTES, RouteParams } from '../../router/config';
import { ProductCard } from '../../components/product-card/product-card';
import { useProducts } from '../../api/api-client-hooks';
import commonStyles from '../../styles/common-styles.module.scss';

export interface ProductsPageProps {
    className?: string;
}

export const ProductsPage = ({ className }: ProductsPageProps) => {
    const { slug: categorySlug } = useParams<RouteParams['/category/:slug']>()
    const { products, categoryName, loading, error } = useProducts(categorySlug);

    if (loading) {
        return <div className={commonStyles.loading}>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <h1 className={styles.title}>{categoryName ? `Products in ${categoryName}` : 'All Products'}</h1>
            <div className={styles.gallery}>
                {products?.map((product) =>
                    product.name && product.slug ? (
                        <Link to={ROUTES.product.to(product.slug)} key={product.id}>
                            <ProductCard
                                imageUrl={product?.image}
                                name={product.name}
                                price={product.price ?? undefined}
                                className={styles.productCard}
                            />
                        </Link>
                    ) : null
                )}
            </div>
        </div>
    );
};
