import classNames from 'classnames';
import styles from './product-card.module.scss';
import { products } from '@wix/stores';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import noImage from '../../assets/img/noImage/[160_200]_noImage.svg';

export type GalleryCardProps = {
    name: string;
    imageUrl?: string;
    className?: string;
    price?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const ProductCard = ({
    name,
    imageUrl,
    className,
    price,
    ...divProps
}: GalleryCardProps) => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    
    return (
        <div className={classNames(styles.root, className)} {...divProps}>
            {imageUrl ? (
                <img src={`${apiBaseUrl}/api/v1/public/product/image/${imageUrl}`} alt={name} className={styles.image} data-testid="product-img" />
            ) : (
                <img src={noImage} alt={name} className={styles.image} data-testid="product-img" />
            )}
            <div className={styles.cardContent}>
                <p className={styles.description}>{name}</p>
                {price && (
                    <p className={CommonStyles_module.price}>{price}</p>
                )}
            </div>
        </div>
    );
};
