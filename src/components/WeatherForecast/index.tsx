import Card from '../Card';

import styles from './weather-forecast.module.css';

function WeatherForecast() {
  return (
    <Card className={styles['weather-forecast']}>
      <h2>Previsão do Tempo</h2>
      <div className={styles['weather-forecast__list']}>
        <div className={styles['weather-forecast__item']}>
          <span className={styles['weather-forecast__item__hour']}>18h</span>
          <img
            className={styles['weather-forecast__item__image']}
            src="./cloud_cloudy_forecast_rain_sun_icon.svg"
            alt=""
          />
          <span className={styles['weather-forecast__item__temperature']}>
            25
          </span>
        </div>
        <div className={styles['weather-forecast__item']}>
          <span className={styles['weather-forecast__item__hour']}>21h</span>
          <img
            className={styles['weather-forecast__item__image']}
            src="./cloud_cloudy_forecast_rain_sun_icon.svg"
            alt=""
          />
          <span className={styles['weather-forecast__item__temperature']}>
            25
          </span>
        </div>
        <div className={styles['weather-forecast__item']}>
          <span className={styles['weather-forecast__item__hour']}>00h</span>
          <img
            className={styles['weather-forecast__item__image']}
            src="./cloud_cloudy_forecast_rain_sun_icon.svg"
            alt=""
          />
          <span className={styles['weather-forecast__item__temperature']}>
            25
          </span>
        </div>
        <div className={styles['weather-forecast__item']}>
          <span className={styles['weather-forecast__item__hour']}>03h</span>
          <img
            className={styles['weather-forecast__item__image']}
            src="./cloud_cloudy_forecast_rain_sun_icon.svg"
            alt=""
          />
          <span className={styles['weather-forecast__item__temperature']}>
            25
          </span>
        </div>
      </div>
    </Card>
  );
}

export default WeatherForecast;
