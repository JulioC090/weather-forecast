import { Drop, Gauge, MapPin, Wind } from '@phosphor-icons/react';
import Card from '../Card';

import styles from './current-weather.module.css';

function CurrentWeather() {
  return (
    <Card className={styles['current-weather']}>
      <img
        className={styles['image']}
        src="./cloud_cloudy_forecast_rain_sun_icon.svg"
        alt=""
      />
      <div className={styles['main']}>
        <span className={styles['main__description']}>chuva moderada</span>
        <span className={styles['main__temperature']}>29</span>
      </div>
      <div className={styles['location']}>
        <MapPin size={20} />
        <div className={styles['location__information']}>
          <span className={styles['location__city']}>London, GB</span>
          <span className={styles['location__state']}>England</span>
        </div>
      </div>
      <div className={styles['additional-information']}>
        <div className={styles['additional-information__item']}>
          <Drop size={24} />
          <span className={styles['additional-information__value']}>90</span>
          <span className={styles['additional-information__label']}>
            Umidade
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Gauge size={24} />
          <span className={styles['additional-information__value']}>1013</span>
          <span className={styles['additional-information__label']}>
            Pressão
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Wind size={24} />
          <span className={styles['additional-information__value']}>2.53</span>
          <span className={styles['additional-information__label']}>Vento</span>
        </div>
      </div>
    </Card>
  );
}

export default CurrentWeather;
