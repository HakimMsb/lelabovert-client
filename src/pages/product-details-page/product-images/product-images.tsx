import { products } from '@wix/stores';
import styles from './product-images.module.scss';
import cx from 'classnames';

export function ProductImages(props: {
    name?: string;
    imageUrl?: string;
    className?: string;
}) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    return (
        <div className={cx(styles.root, props.className)}>
            <img
                src={`${apiBaseUrl}/api/v1/public/product/image/${props.imageUrl}`}
                alt={props.name}
                className={styles.img}
                data-testid="product-img"
            />
            {/* <div className={styles['image-grid']}>
                {restImages?.map((item, index) => {
                    return (
                        <img
                            key={index}
                            src={getImageHttpUrl(item.image?.url, 500)}
                            alt={item.title}
                        />
                    );
                })}
            </div> */}
        </div>
    );
}
