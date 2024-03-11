import { AirQualityValues } from '../components/AirQuality';
import { Weather } from '../components/CurrentWeather';
import { SearchResult } from '../components/SearchBar';
import { SunPeriod } from '../components/SunTime';
import { Forecast } from '../components/WeatherForecast';

export type WeatherInformation = Promise<{
  currentWeatherResponse: Weather;
  airQualityResponse: AirQualityValues;
  weatherForecastResponse: Array<Forecast>;
  sunPeriodResponse: SunPeriod;
}>;

interface WeatherGateway {
  getWeatherInformation(location: SearchResult): WeatherInformation;
}

export default WeatherGateway;
