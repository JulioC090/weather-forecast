import Skeleton from 'react-loading-skeleton';
import styles from './air-quality.module.css';

const componentsName = ['CO', 'SO2', 'NO', 'PM2.5', 'NO2', 'PM10', 'O3', 'NH3'];

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
        {componentsName.map((component) => (
          <div key={component} className={styles['component-list__item']}>
            <span>{component}:</span> <Skeleton count={1} width={56} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AirQualityFallback;
