import { SearchResult } from '../components/SearchBar';
import LocationGateway from './LocationGateway';

class LocalStorageLocationGateway implements LocationGateway {
  private readonly localStorageKey: string = 'location';

  async get(): Promise<SearchResult> {
    const storageLocation = localStorage.getItem(this.localStorageKey);
    return storageLocation ? JSON.parse(storageLocation) : undefined;
  }

  save(location: SearchResult): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(location));
  }
}

export default LocalStorageLocationGateway;
