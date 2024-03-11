import Card from '../../layout/Card';
import Loader from '../../primitives/Loader';
import AirQualityContent from './AirQualityContent';
import AirQualityFallback from './AirQualityFallback';
import styles from './air-quality.module.css';

export type AirQualityValues = {
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
};

interface AirQualityProps {
  airQuality: AirQualityValues | undefined;
}

function AirQuality({ airQuality }: AirQualityProps) {
  return (
    <Card className={styles['air-quality']}>
      <Loader
        dependency={airQuality}
        content={<AirQualityContent airQuality={airQuality!} />}
        fallback={<AirQualityFallback />}
      />
    </Card>
  );
}

export default AirQuality;
