import { Drop, Gauge, MapPin, Wind } from '@phosphor-icons/react';
import { Weather } from '.';
import CityLocation from '../../models/CityLocation';
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
          <span className={styles['location__state']}>{location.region}</span>
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
          <span className={styles['additional-information__label']}>Vento</span>
        </div>
      </div>
    </>
  );
}

export default CurrentWeatherContent;
