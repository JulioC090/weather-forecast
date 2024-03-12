import Forecast from '../../models/Forecast';
import { formatHour } from '../../utils/formatDate';
import styles from './weather-forecast.module.css';

interface WeatherForecastContentProps {
  forecast: Array<Forecast>;
}

function WeatherForecastContent({ forecast }: WeatherForecastContentProps) {
  return (
    <>
      {forecast &&
        forecast.map((forecast) => (
          <div
            className={styles['weather-forecast__item']}
            key={forecast.timestamp}
          >
            <span className={styles['weather-forecast__item__hour']}>
              {formatHour(new Date(forecast.timestamp))}
            </span>
            <img
              className={styles['weather-forecast__item__image']}
              src={`./${forecast.icon}.svg`}
              alt={forecast.weather}
            />
            <span className={styles['weather-forecast__item__temperature']}>
              {Math.round(forecast.temp)}
            </span>
          </div>
        ))}
    </>
  );
}

export default WeatherForecastContent;
