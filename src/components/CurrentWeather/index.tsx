import { Drop, Gauge, MapPin, Wind } from '@phosphor-icons/react';
import Card from '../Card';

import styles from './current-weather.module.css';
import { useEffect, useState } from 'react';
import { SearchResult } from '../SearchBar';

type Weather = {
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=pt&appid=bb3fe9249aa22592aa178dd7c454545b`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((json) => setWeather(json));
  }, [location]);

  return (
    <Card className={styles['current-weather']}>
      {weather && (
        <>
          <img
            className={styles['image']}
            src={`./${weather.weather[0].icon}.svg`}
            alt={weather.weather[0].main}
          />
          <div className={styles['main']}>
            <span className={styles['main__description']}>
              {weather?.weather[0].description}
            </span>
            <span className={styles['main__temperature']}>
              {Math.round(weather?.main.temp)}
            </span>
          </div>
          <div className={styles['location']}>
            <MapPin size={20} />
            <div className={styles['location__information']}>
              <span className={styles['location__city']}>
                {location.name}, {location.countryCode}
              </span>
              <span className={styles['location__state']}>
                {location.region}
              </span>
            </div>
          </div>
          <div className={styles['additional-information']}>
            <div className={styles['additional-information__item']}>
              <Drop size={24} />
              <span className={styles['additional-information__value']}>
                {weather.main.humidity}
              </span>
              <span className={styles['additional-information__label']}>
                Umidade
              </span>
            </div>
            <div className={styles['additional-information__item']}>
              <Gauge size={24} />
              <span className={styles['additional-information__value']}>
                {weather.main.pressure}
              </span>
              <span className={styles['additional-information__label']}>
                Pressão
              </span>
            </div>
            <div className={styles['additional-information__item']}>
              <Wind size={24} />
              <span className={styles['additional-information__value']}>
                {weather.wind.speed}
              </span>
              <span className={styles['additional-information__label']}>
                Vento
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default CurrentWeather;
