import Card from '../../layout/Card';

import { useEffect, useState } from 'react';
import Loader from '../../primitives/Loader';
import { SearchResult } from '../SearchBar';
import CurrentWeatherContent from './CurrentWeatherContent';
import CurrentWeatherFallback from './CurrentWeatherFallback';
import styles from './current-weather.module.css';

export type Weather = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
};

interface CurrentWeatherProps {
  location: SearchResult;
}

function CurrentWeather({ location }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=pt&appid=${import.meta.env.VITE_WEATHER_APP_KEY}`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((json) => setWeather(json));
  }, [location]);

  return (
    <Card className={styles['current-weather']}>
      <Loader
        dependency={weather}
        content={
          <CurrentWeatherContent weather={weather!} location={location} />
        }
        fallback={<CurrentWeatherFallback />}
      />
    </Card>
  );
}

export default CurrentWeather;
