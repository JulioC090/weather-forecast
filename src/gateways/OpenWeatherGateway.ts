import AirParams from '../models/AirParams';
import CityLocation from '../models/CityLocation';
import Weather from '../models/Weather';
import WeatherGateway, { WeatherInformation } from './WeatherGateway';

class OpenWeatherGateway implements WeatherGateway {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private appid: string;

  constructor(appid: string) {
    this.appid = appid;
  }

  private async getCurrentWeather(location: CityLocation): Promise<Weather> {
    const response = await fetch(
      `${this.baseURL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=pt&appid=${this.appid}`,
      { method: 'GET' },
    );

    const data = await response.json();

    return {
      name: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: data.wind.speed,
    };
  }

  private async getAirQuality(location: CityLocation): Promise<AirParams> {
    const response = await fetch(
      `${this.baseURL}/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${this.appid}`,
      { method: 'GET' },
    );

    const data = (await response.json()).list[0];

    return { aqi: data.main.aqi, components: data.components };
  }

  private async getWeatherForecast(location: CityLocation) {
    const response = await fetch(
      `${this.baseURL}/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&cnt=8&lang=pt&appid=${this.appid}`,
      { method: 'GET' },
    );

    return await response.json();
  }

  async getWeatherInformation(location: CityLocation): WeatherInformation {
    const [
      currentWeatherResponse,
      airQualityResponse,
      forecastAndSunPeriodResponse,
    ] = await Promise.all([
      this.getCurrentWeather(location),
      this.getAirQuality(location),
      this.getWeatherForecast(location),
    ]);

    const weatherForecastResponse = forecastAndSunPeriodResponse.list.map(
      (forecast: {
        weather: [{ main: string; icon: string }];
        main: { temp: number };
        dt: number;
      }) => ({
        weather: forecast.weather[0].main,
        temp: forecast.main.temp,
        icon: forecast.weather[0].icon,
        timestamp: forecast.dt * 1000,
      }),
    );

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
