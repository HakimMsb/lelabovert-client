import classNames from 'classnames';
import styles from './header.module.scss';
import { ROUTES } from '../../router/config';
import { Cart } from '../cart/cart';
import { Link, useNavigate } from 'react-router-dom';
import CommonStyles_module from '../../styles/common-styles.module.scss';
import DropdownMenu from './menu/dropdown-menu';
import { useAuth } from '/src/api/auth-context';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.home.to());
    };

    return (
        <div className={classNames(styles.root, className)}>
            <Link to="/" className={styles.logo}>
                <img
                    src="/src/assets/img/logofinal-lelabo.png"
                    alt=""
                    width=""
                    height="70"
                />
            </Link>
            <div className={styles.menu}>
                <Link
                    to="/"
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    Home
                </Link>
                <DropdownMenu />
                <Link
                    to={ROUTES.products.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    Products
                </Link>
                <Link
                    to={ROUTES.about.to()}
                    className={classNames(CommonStyles_module.secondaryButton, styles.menuButton)}
                >
                    About
                </Link>
                {isLoggedIn ? (
                    <><Link
                        to={ROUTES.profile.to()}
                        className={classNames(
                            CommonStyles_module.secondaryButton,
                            styles.menuButton
                        )}
                    >
                        Profile
                    </Link>
                    <button onClick={handleLogout}>Logout</button></>
                ) : (
                    <Link
                        to={ROUTES.login.to()}
                        className={classNames(
                            CommonStyles_module.secondaryButton,
                            styles.menuButton
                        )}
                    >
                        Login
                    </Link>
                )}

                <Cart className={styles.menuButton} />
            </div>
        </div>
    );
};
