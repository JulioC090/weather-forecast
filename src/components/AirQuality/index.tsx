import { useEffect, useState } from 'react';
import Card from '../../layout/Card';
import Loader from '../../primitives/Loader';
import { SearchResult } from '../SearchBar';
import AirQualityContent from './AirQualityContent';
import AirQualityFallback from './AirQualityFallback';
import styles from './air-quality.module.css';

export type AirQuality = {
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
  location: SearchResult;
}

function AirQuality({ location }: AirQualityProps) {
  const [airQuality, setAirQuality] = useState<AirQuality>();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_WEATHER_APP_KEY}`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((json) => setAirQuality(json.list[0]));
  }, [location]);

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
