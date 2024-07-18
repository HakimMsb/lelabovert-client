import classNames from 'classnames';
import styles from './home-page.module.scss';
import { HeroImage } from './hero-image/hero-image';
import { ROUTES } from '../../router/config';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card';
import { useProducts } from '/src/api/api-client-hooks';
import commonStyles from '../../styles/common-styles.module.scss';

export interface HomePageProps {
  className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();

  return (
    <div className={classNames(styles.root, className)}>
      <HeroImage
        title="Incredible Prices on All Your Favorite Items"
        topLabel="Best Prices"
        bottomLabel="Get more for less on selected brands"
        buttonLabel="Shop Now"
        topLabelClassName={styles['top-label-highlighted']}
        onButtonClick={() => navigate(ROUTES.products.to())}
      />
      <h1 className={styles['hero-title']}>Best Sellers</h1>
      <p className={styles.HPprgrp}>Shop our best seller items</p>
      {loading ? (
        <div className={commonStyles.loading}>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className={styles.cardsLayout}>
          {products?.map((product) =>
            product.slug && product.name ? (
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
      )}
    </div>
  );
};
