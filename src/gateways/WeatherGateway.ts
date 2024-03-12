import AirParams from '../models/AirParams';
import CityLocation from '../models/CityLocation';
import Forecast from '../models/Forecast';
import SunPeriod from '../models/SunPeriod';
import Weather from '../models/Weather';

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
