import { useEffect, useState } from 'react';
import Card from '../Card';
import { SearchResult } from '../SearchBar';

import styles from './weather-forecast.module.css';
import formatHour from '../../utils/formatHour';

type Forecast = {
  dt: number;
  main: { temp: number };
  weather: [{ main: string; icon: string }];
};

interface WeatherForecastProps {
  location: SearchResult;
}

function WeatherForecast({ location }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<Array<Forecast>>();

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&cnt=8&lang=pt&appid=bb3fe9249aa22592aa178dd7c454545b`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((json) => setForecast(json.list));
  }, [location]);

  return (
    <Card className={styles['weather-forecast']}>
      <h2>Previsão do Tempo</h2>
      <div className={styles['weather-forecast__list']}>
        {forecast &&
          forecast.map((forecast) => (
            <div className={styles['weather-forecast__item']} key={forecast.dt}>
              <span className={styles['weather-forecast__item__hour']}>
                {formatHour(new Date(forecast.dt * 1000))}
              </span>
              <img
                className={styles['weather-forecast__item__image']}
                src={`./${forecast.weather[0].icon}.svg`}
                alt={forecast.weather[0].main}
              />
              <span className={styles['weather-forecast__item__temperature']}>
                {Math.round(forecast.main.temp)}
              </span>
            </div>
          ))}
      </div>
    </Card>
  );
}

export default WeatherForecast;
