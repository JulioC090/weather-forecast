import { SearchResult } from '../components/SearchBar';

interface LocationGateway {
  get(): Promise<SearchResult>;
  save(location: SearchResult): void;
}

export default LocationGateway;
