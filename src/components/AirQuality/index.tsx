import Card from '../../layout/Card';
import AirParams from '../../models/AirParams';
import Loader from '../../primitives/Loader';
import AirQualityContent from './AirQualityContent';
import AirQualityFallback from './AirQualityFallback';
import styles from './air-quality.module.css';

interface AirQualityProps {
  airQuality?: AirParams;
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
