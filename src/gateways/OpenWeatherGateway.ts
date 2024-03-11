import { SearchResult } from '../components/SearchBar';
import WeatherGateway, { WeatherInformation } from './WeatherGateway';

class OpenWeatherGateway implements WeatherGateway {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private appid: string;

  constructor(appid: string) {
    this.appid = appid;
  }

  private async getCurrentWeather(location: SearchResult) {
    const response = await fetch(
      `${this.baseURL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=pt&appid=${this.appid}`,
      { method: 'GET' },
    );

    return await response.json();
  }

  private async getAirQuality(location: SearchResult) {
    const response = await fetch(
      `${this.baseURL}/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${this.appid}`,
      { method: 'GET' },
    );

    return (await response.json()).list[0];
  }

  private async getWeatherForecast(location: SearchResult) {
    const response = await fetch(
      `${this.baseURL}/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&cnt=8&lang=pt&appid=${this.appid}`,
      { method: 'GET' },
    );

    return await response.json();
  }

  async getWeatherInformation(location: SearchResult): WeatherInformation {
    const [
      currentWeatherResponse,
      airQualityResponse,
      forecastAndSunPeriodResponse,
    ] = await Promise.all([
      this.getCurrentWeather(location),
      this.getAirQuality(location),
      this.getWeatherForecast(location),
    ]);

    const weatherForecastResponse = forecastAndSunPeriodResponse.list;
    const sunPeriodResponse = {
      sunset: forecastAndSunPeriodResponse.city.sunset * 1000,
      sunrise: forecastAndSunPeriodResponse.city.sunrise * 1000,
    };

    return {
      currentWeatherResponse,
      airQualityResponse,
      weatherForecastResponse,
      sunPeriodResponse,
    };
  }
}

export default OpenWeatherGateway;
