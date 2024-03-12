import CityLocation from '../models/CityLocation';
import LocationGateway from './LocationGateway';

class LocalStorageLocationGateway implements LocationGateway {
  private readonly localStorageKey: string = 'location';

  async get(): Promise<CityLocation> {
    const storageLocation = localStorage.getItem(this.localStorageKey);
    return storageLocation && JSON.parse(storageLocation);
  }

  save(location: CityLocation): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(location));
  }
}

export default LocalStorageLocationGateway;
