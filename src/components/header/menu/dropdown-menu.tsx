import { useCategories } from "/src/api/api-client-hooks";
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from "/src/router/config";
import styles from './dropdown-menu.module.scss';


const DropdownMenu: React.FC = () => {
  const {categories, loading, error} = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
     setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn} onMouseEnter={handleMouseEnter} /*onMouseLeave={handleMouseLeave}*/>Categories</button>
      <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ''}`}>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading categories</p>}
        {categories.map(category => 
          category.slug ? (
            <Link key={category.id} to={ROUTES.category.to(category.slug)}
              className={styles.dropdownItem}>
              {category.name}
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};
    
export default DropdownMenu;
