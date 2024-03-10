import { Drop, Gauge, MapPin, Wind } from '@phosphor-icons/react';
import Skeleton from 'react-loading-skeleton';
import styles from './current-weather.module.css';

function CurrentWeatherFallback() {
  return (
    <>
      <Skeleton
        containerClassName={styles['image']}
        style={{ aspectRatio: 1 }}
      />
      <div className={styles['main']}>
        <span className={styles['main__description']}>
          <Skeleton count={1} width={128} />
        </span>
        <span className={`${styles['main__temperature']} no-after`}>
          <Skeleton count={1} width={48} />
        </span>
      </div>
      <div className={styles['location']}>
        <MapPin size={20} />
        <div className={styles['location__information']}>
          <span
            className={styles['location__city']}
            style={{ display: 'flex', gap: 4 }}
          >
            <Skeleton count={1} width={56} />
            <Skeleton count={1} width={24} />
          </span>
          <span className={styles['location__state']}>
            <Skeleton count={1} width={48} />
          </span>
        </div>
      </div>
      <div className={styles['additional-information']}>
        <div className={styles['additional-information__item']}>
          <Drop size={24} />
          <Skeleton count={1} width={32} />
          <span className={styles['additional-information__label']}>
            Umidade
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Gauge size={24} />
          <Skeleton count={1} width={32} />
          <span className={styles['additional-information__label']}>
            Pressão
          </span>
        </div>
        <div className={styles['additional-information__item']}>
          <Wind size={24} />
          <Skeleton count={1} width={32} />
          <span className={styles['additional-information__label']}>Vento</span>
        </div>
      </div>
    </>
  );
}

export default CurrentWeatherFallback;
