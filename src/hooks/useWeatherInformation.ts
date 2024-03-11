import { useEffect, useState } from 'react';
import { AirQualityValues } from '../components/AirQuality';
import { Weather } from '../components/CurrentWeather';
import { SearchResult } from '../components/SearchBar';
import { SunPeriod } from '../components/SunTime';
import { Forecast } from '../components/WeatherForecast';
import WeatherGateway from '../gateways/WeatherGateway';

function useWeatherInformation(weatherGateway: WeatherGateway) {
  const storageLocation = localStorage.getItem('location');

  const [location, setLocation] = useState<SearchResult>(
    storageLocation ? JSON.parse(storageLocation) : undefined,
  );
  const [forecast, setForecast] = useState<Array<Forecast>>();
  const [sunPeriod, setSunPeriod] = useState<SunPeriod>();
  const [airQuality, setAirQuality] = useState<AirQualityValues>();
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    async function fetchData() {
      const {
        currentWeatherResponse,
        weatherForecastResponse,
        airQualityResponse,
        sunPeriodResponse,
      } = await weatherGateway.getWeatherInformation(location);

      setWeather(currentWeatherResponse);
      setForecast(weatherForecastResponse);
      setAirQuality(airQualityResponse);
      setSunPeriod(sunPeriodResponse);
    }

    if (!location) return;
    fetchData();
  }, [location, weatherGateway]);

  return { location, setLocation, forecast, sunPeriod, airQuality, weather };
}

export default useWeatherInformation;
