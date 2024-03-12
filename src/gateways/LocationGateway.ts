import CityLocation from '../models/CityLocation';

interface LocationGateway {
  get(): Promise<CityLocation>;
  save(location: CityLocation): void;
}

export default LocationGateway;
