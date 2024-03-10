import { MagnifyingGlass, MapPin, X } from '@phosphor-icons/react';
import styles from './search-bar.module.css';
import { useRef, useState } from 'react';
import Card from '../Card';

export type SearchResult = {
  wikiDataId: string;
  name: string;
  region: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

interface SearchBarProps {
  onSubmit(result: SearchResult): void;
}

let timer: number;

function SearchBar({ onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Array<SearchResult>>([]);

  const [active, setActive] = useState(false);
  const [activedescendant, setActiveDescendant] = useState(0);

  function handleSubmit(result: SearchResult) {
    setSearchQuery(result.name);
    onSubmit(result);
    handleBlur();
    inputRef.current?.blur();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    setSearchQuery(query);

    if (query.length <= 2) return;
    setResults([]);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fetch(
        `https://corsproxy.io/?http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${query}&hateoasMode=false&languageCode=pt_BR&limit=5&offset=0`,
        { method: 'GET' },
      )
        .then((response) => response.json())
        .then((json) => setResults(json.data));
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
            activedescendant
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
                <MapPin size={32} />
                <div className={styles['search-bar__item__information']}>
                  <span className={styles['search-bar__item__city']}>
                    {item.name}, {item.countryCode}
                  </span>
                  <span className={styles['search-bar__item__state']}>
                    {item.region}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default SearchBar;
