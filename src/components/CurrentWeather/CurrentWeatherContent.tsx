import { Drop, Gauge, Wind } from '@phosphor-icons/react';
import CityLocation from '../../models/CityLocation';
import Weather from '../../models/Weather';
import LocationItem from '../LocationItem';
import styles from './current-weather.module.css';

interface CurrentWeatherProps {
  weather: Weather;
  location: CityLocation;
}

function CurrentWeatherContent({ weather, location }: CurrentWeatherProps) {
  return (
    <>
      <img
        className={styles['image']}
        src={`./${weather.icon}.svg`}
        alt={weather.name}
      />
      <div className={styles['main']}>
        <span className={styles['main__description']}>
          {weather.description}
        </span>
        <span className={styles['main__temperature']}>
          {Math.round(weather.temp)}
        </span>
      </div>
      <LocationItem location={location} className={styles['location']} />
      <div className={styles['additional-information']}>
        <div className={styles['additional-information__item']}>
          <Drop size={24} />
          <span className={styles['additional-information__value']}>
            {weather.humidity}
          </span>
          <span className={styles['additional-information__label']}>
            Umidade
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Gauge size={24} />
          <span className={styles['additional-information__value']}>
            {weather.pressure}
          </span>
          <span className={styles['additional-information__label']}>
            Pressão
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Wind size={24} />
          <span className={styles['additional-information__value']}>
            {weather.wind}
          </span>
          <span className={styles['additional-information__label']}>Vento</span>
        </div>
      </div>
    </>
  );
}

export default CurrentWeatherContent;
