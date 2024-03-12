import CityLocation from '../models/CityLocation';

interface SearchLocationsGateway {
  getLocation(query: string): Promise<Array<CityLocation>>;
}

export default SearchLocationsGateway;
