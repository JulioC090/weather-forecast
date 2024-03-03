import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from './search-bar.module.css';

function SearchBar() {
  return (
    <div className={styles['search-bar']}>
      <MagnifyingGlass size={24} />
      <input
        className={styles['search-bar__input']}
        type="text"
        placeholder="Procurar cidade"
      />
    </div>
  );
}

export default SearchBar;
