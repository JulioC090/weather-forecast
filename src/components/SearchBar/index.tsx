import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import Card from '../../layout/Card';
import CityLocation from '../../models/CityLocation';
import LocationItem from '../LocationItem';
import styles from './search-bar.module.css';

interface SearchBarProps {
  onQueryChange(query: string): Promise<Array<CityLocation>>;
  onSubmit(result: CityLocation): void;
}

let timer: number;

function SearchBar({ onQueryChange, onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Array<CityLocation>>([]);

  const [active, setActive] = useState(false);
  const [activedescendant, setActiveDescendant] = useState(0);

  function handleSubmit(result: CityLocation) {
    setSearchQuery(result.name);
    onSubmit(result);
    handleBlur();
    inputRef.current?.blur();
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    setSearchQuery(query);

    if (query.length <= 2) return;
    setResults([]);
    setActiveDescendant(0);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      setResults(await onQueryChange(query));
    }, 500);
  }

  function handleFocus() {
    setActive(true);
  }

  function handleBlur() {
    setActive(false);
    setActiveDescendant(0);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (document.activeElement !== inputRef.current && results.length === 0)
      return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextActiveDescendant =
        activedescendant === results.length ? 0 : activedescendant + 1;

      setActiveDescendant(nextActiveDescendant);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextActiveDescendant =
        activedescendant === 0 ? results.length : activedescendant - 1;

      setActiveDescendant(nextActiveDescendant);
    }

    if (event.key === 'Enter') {
      if (activedescendant) {
        event.preventDefault();
        handleSubmit(results[activedescendant - 1]);
      }

      if (results) {
        handleSubmit(results[0]);
      }
    }
  }

  function clearSearchQuery() {
    setSearchQuery('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles['search-bar']}>
      <div className={styles['search-bar__input-container']}>
        <MagnifyingGlass size={24} />
        <input
          ref={inputRef}
          aria-owns="results"
          aria-haspopup="listbox"
          aria-expanded={results.length > 0}
          aria-activedescendant={
            results.length > 0 && activedescendant
              ? results[activedescendant - 1].wikiDataId +
                (activedescendant - 1)
              : ''
          }
          className={styles['search-bar__input']}
          type="text"
          placeholder="Procurar cidade"
          onChange={(event) => handleChange(event)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(event) => handleKeyDown(event)}
          value={searchQuery}
        />
        {searchQuery && (
          <button
            className={styles['search-bar__clear-button']}
            type="button"
            onClick={clearSearchQuery}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {results.length > 0 && active && (
        <Card className={styles['search-bar__list-container']}>
          <ul
            id="results"
            role="listbox"
            className={styles['search-bar__list']}
          >
            {results.map((item, index) => (
              <li
                id={item.wikiDataId + index}
                key={item.wikiDataId + index}
                role="option"
                className={`${styles['search-bar__item']} ${index === activedescendant - 1 ? styles['search-bar__item--active'] : ''}`}
                onMouseDown={() => handleSubmit(results[index])}
              >
                <LocationItem location={item} />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default SearchBar;
