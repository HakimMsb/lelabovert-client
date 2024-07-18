import classNames from 'classnames';
import styles from './product-info.module.scss';
import { products } from '@wix/stores';

export interface ProductInfoProps {
    className?: string;
    productInfo?: string;
}

export const ProductInfo = ({ className, productInfo }: ProductInfoProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            {/* {productInfo?.map((info, index) => (
                <div key={info.title || index}>
                    <div className={styles['info-title']}>{info.title}</div>
                    <div className={styles['info-prgrp']}>{info.description}</div>
                </div>
            ))} */}
            {
                productInfo
            }
        </div>
    );
};
