import { SearchResult } from '../components/SearchBar';

interface SearchLocationsGateway {
  getLocation(query: string): Promise<Array<SearchResult>>;
}

export default SearchLocationsGateway;
