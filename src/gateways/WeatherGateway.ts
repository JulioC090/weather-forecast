import { Weather } from '../components/CurrentWeather';
import { SearchResult } from '../components/SearchBar';
import { SunPeriod } from '../components/SunTime';
import { Forecast } from '../components/WeatherForecast';
import AirParams from '../models/AirParams';

export type WeatherInformation = Promise<{
  currentWeatherResponse: Weather;
  airQualityResponse: AirParams;
  weatherForecastResponse: Array<Forecast>;
  sunPeriodResponse: SunPeriod;
}>;

interface WeatherGateway {
  getWeatherInformation(location: SearchResult): WeatherInformation;
}

export default WeatherGateway;
