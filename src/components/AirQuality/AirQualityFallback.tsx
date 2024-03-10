import Skeleton from 'react-loading-skeleton';
import styles from './air-quality.module.css';

function AirQualityFallback() {
  return (
    <>
      <div className={styles['wrapper']}>
        <h2>Qualidade do Ar</h2>
        <Skeleton
          count={1}
          width={72}
          height={20}
          containerClassName="vertical-center"
        />
      </div>
      <div className={styles['component-list']}>
        <div className={styles['component-list__item']}>
          <span>CO:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>SO2:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>NO:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>PM2.5:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>NO2:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>PM10:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>O3:</span> <Skeleton count={1} width={56} />
        </div>
        <div className={styles['component-list__item']}>
          <span>NH3:</span> <Skeleton count={1} width={56} />
        </div>
      </div>
    </>
  );
}

export default AirQualityFallback;
