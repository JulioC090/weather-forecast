import Skeleton from 'react-loading-skeleton';
import styles from './weather-forecast.module.css';

function WeatherForecastFallback() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          className={styles['weather-forecast__item']}
          key={`forecast-item-${i}`}
        >
          <Skeleton width={24} />
          <Skeleton width={32} height={32} />
          <Skeleton width={24} />
        </div>
      ))}
    </>
  );
}

export default WeatherForecastFallback;
