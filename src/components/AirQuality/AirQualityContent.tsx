import { AirQuality } from '.';
import styles from './air-quality.module.css';

interface AirQualityContentProps {
  airQuality: AirQuality;
}

const aqiMap: { [aqi: number]: string } = {
  1: 'Bom',
  2: 'Regular',
  3: 'Moderado',
  4: 'Ruim',
  5: 'Muito Ruim',
};

function AirQualityContent({ airQuality }: AirQualityContentProps) {
  return (
    <>
      <div className={styles['wrapper']}>
        <h2>Qualidade do Ar</h2>
        <span className={styles['tag']} data-aqi={airQuality.main.aqi}>
          {aqiMap[airQuality.main.aqi]}
        </span>
      </div>
      <div className={styles['component-list']}>
        <div className={styles['component-list__item']}>
          <span>CO:</span> {airQuality.components.co}
        </div>
        <div className={styles['component-list__item']}>
          <span>SO2:</span> {airQuality.components.so2}
        </div>
        <div className={styles['component-list__item']}>
          <span>NO:</span> {airQuality.components.no}
        </div>
        <div className={styles['component-list__item']}>
          <span>PM2.5:</span> {airQuality.components.pm2_5}
        </div>
        <div className={styles['component-list__item']}>
          <span>NO2:</span> {airQuality.components.no2}
        </div>
        <div className={styles['component-list__item']}>
          <span>PM10:</span> {airQuality.components.pm10}
        </div>
        <div className={styles['component-list__item']}>
          <span>O3:</span> {airQuality.components.o3}
        </div>
        <div className={styles['component-list__item']}>
          <span>NH3:</span> {airQuality.components.nh3}
        </div>
      </div>
    </>
  );
}

export default AirQualityContent;
