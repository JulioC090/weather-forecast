import { SearchResult } from '../components/SearchBar';
import SearchLocationsGateway from './SearchLocationsGateway';

class GeoDBSearchLocationsGateway implements SearchLocationsGateway {
  async getLocation(query: string): Promise<Array<SearchResult>> {
    const response = await fetch(
      `https://corsproxy.io/?http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${query}&hateoasMode=false&languageCode=pt_BR&limit=5&offset=0`,
      { method: 'GET' },
    );

    return (await response.json()).data;
  }
}

export default GeoDBSearchLocationsGateway;
