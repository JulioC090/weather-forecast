import { useEffect, useState } from 'react';
import { Weather } from '../components/CurrentWeather';
import { SearchResult } from '../components/SearchBar';
import { Forecast } from '../components/WeatherForecast';
import LocationGateway from '../gateways/LocationGateway';
import WeatherGateway from '../gateways/WeatherGateway';
import AirParams from '../models/AirParams';
import SunPeriod from '../models/SunPeriod';

function useWeatherInformation(
  locationGateway: LocationGateway,
  weatherGateway: WeatherGateway,
) {
  const [location, setLocationState] = useState<SearchResult>();
  const [forecast, setForecast] = useState<Array<Forecast>>();
  const [sunPeriod, setSunPeriod] = useState<SunPeriod>();
  const [airQuality, setAirQuality] = useState<AirParams>();
  const [weather, setWeather] = useState<Weather>();

  function setLocation(location: SearchResult) {
    setLocationState(location);
    locationGateway.save(location);
  }

  useEffect(() => {
    async function fetchData() {
      setLocationState(await locationGateway.get());
    }

    fetchData();
  }, [locationGateway]);

  useEffect(() => {
    async function fetchData() {
      const {
        currentWeatherResponse,
        weatherForecastResponse,
        airQualityResponse,
        sunPeriodResponse,
      } = await weatherGateway.getWeatherInformation(location!);

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
