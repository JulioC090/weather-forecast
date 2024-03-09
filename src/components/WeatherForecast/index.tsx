import Card from '../Card';

import styles from './weather-forecast.module.css';
import { formatHour } from '../../utils/formatDate';

export type Forecast = {
  dt: number;
  main: { temp: number };
  weather: [{ main: string; icon: string }];
};

interface WeatherForecastProps {
  forecast: Array<Forecast> | undefined;
}

function WeatherForecast({ forecast }: WeatherForecastProps) {
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
