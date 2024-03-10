import { Forecast } from '.';
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
    </>
  );
}

export default WeatherForecastContent;
