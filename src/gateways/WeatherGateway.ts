import { Weather } from '../components/CurrentWeather';
import { Forecast } from '../components/WeatherForecast';
import AirParams from '../models/AirParams';
import CityLocation from '../models/CityLocation';
import SunPeriod from '../models/SunPeriod';

export type WeatherInformation = Promise<{
  currentWeatherResponse: Weather;
  airQualityResponse: AirParams;
  weatherForecastResponse: Array<Forecast>;
  sunPeriodResponse: SunPeriod;
}>;

interface WeatherGateway {
  getWeatherInformation(location: CityLocation): WeatherInformation;
}

export default WeatherGateway;
