import AirParams from '../../models/AirParams';
import styles from './air-quality.module.css';

interface AirQualityContentProps {
  airQuality: AirParams;
}

const aqiMap: { [aqi: number]: string } = {
  1: 'Bom',
  2: 'Regular',
  3: 'Moderado',
  4: 'Ruim',
  5: 'Muito Ruim',
};

function AirQualityContent({ airQuality }: AirQualityContentProps) {
  const componentList = Object.entries(airQuality.components);

  return (
    <>
      <div className={styles['wrapper']}>
        <h2>Qualidade do Ar</h2>
        <span className={styles['tag']} data-aqi={airQuality.aqi}>
          {aqiMap[airQuality.aqi]}
        </span>
      </div>
      <div className={styles['component-list']}>
        {componentList.map(([key, value]) => (
          <div key={key} className={styles['component-list__item']}>
            <span>{key.replace('_', '.')}:</span> {value}
          </div>
        ))}
      </div>
    </>
  );
}

export default AirQualityContent;
