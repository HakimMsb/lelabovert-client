import { useState } from "react";
import { useAuth } from "/src/api/auth-context";
import { ProfileEditForm } from "/src/components/profile/profile-edit-form/profile-edit-form";
import { ProfileOrders } from "/src/components/profile/profile-orders/profile-orders";
import styles from "./profile-page.module.scss"
import classNames from "classnames";


export const ProfilePage = ({ className }: { className?: string }) => {
    const {userProfile} = useAuth();
    const [activeSection, setActiveSection] = useState<'editProfile' | 'orders'>('editProfile');

    if (!userProfile) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.menu}>
                <button
                    className={classNames(styles.menuButton, { [styles.active]: activeSection === 'editProfile' })}
                    onClick={() => setActiveSection('editProfile')}
                >
                    Edit Profile
                </button>
                <button
                    className={classNames(styles.menuButton, { [styles.active]: activeSection === 'orders' })}
                    onClick={() => setActiveSection('orders')}
                >
                    Orders
                </button>
            </div>
            <div className={styles.content}>
                <div className={classNames(styles.section, { [styles.active]: activeSection === 'editProfile' })}>
                    <ProfileEditForm />
                </div>
                <div className={classNames(styles.section, { [styles.active]: activeSection === 'orders' })}>
                    <ProfileOrders />
                </div>
            </div>
        </div>
    );
};
