import Card from '../Card';

import styles from './air-quality.module.css';

function AirQuality() {
  return (
    <Card className={styles['air-quality']}>
      <div className={styles['wrapper']}>
        <h2>Qualidade do Ar</h2>
        <span className={styles['tag']}>Moderado</span>
      </div>
      <div className={styles['component-list']}>
        <div className={styles['component-list__item']}>
          <span>CO:</span> 323.77
        </div>
        <div className={styles['component-list__item']}>
          <span>SO2:</span> 0.04
        </div>
        <div className={styles['component-list__item']}>
          <span>NO:</span> 0
        </div>
        <div className={styles['component-list__item']}>
          <span>PM2.5:</span> 0.72
        </div>
        <div className={styles['component-list__item']}>
          <span>NO2:</span> 0.06
        </div>
        <div className={styles['component-list__item']}>
          <span>PM10:</span> 1.16
        </div>
        <div className={styles['component-list__item']}>
          <span>O3:</span> 0.01
        </div>
        <div className={styles['component-list__item']}>
          <span>NH3:</span> 323.77
        </div>
      </div>
    </Card>
  );
}

export default AirQuality;
