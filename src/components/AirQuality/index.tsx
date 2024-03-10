import { useEffect, useState } from 'react';
import Card from '../Card';
import { SearchResult } from '../SearchBar';

import styles from './air-quality.module.css';

type AirQuality = {
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

const aqiMap: { [aqi: number]: string } = {
  1: 'Bom',
  2: 'Regular',
  3: 'Moderado',
  4: 'Ruim',
  5: 'Muito Ruim',
};

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
      <div className={styles['wrapper']}>
        <h2>Qualidade do Ar</h2>
        <span className={styles['tag']} data-aqi={airQuality?.main.aqi}>
          {airQuality ? aqiMap[airQuality.main.aqi] : 'Desconhecido'}
        </span>
      </div>
      <div className={styles['component-list']}>
        <div className={styles['component-list__item']}>
          <span>CO:</span> {airQuality?.components.co}
        </div>
        <div className={styles['component-list__item']}>
          <span>SO2:</span> {airQuality?.components.so2}
        </div>
        <div className={styles['component-list__item']}>
          <span>NO:</span> {airQuality?.components.no}
        </div>
        <div className={styles['component-list__item']}>
          <span>PM2.5:</span> {airQuality?.components.pm2_5}
        </div>
        <div className={styles['component-list__item']}>
          <span>NO2:</span> {airQuality?.components.no2}
        </div>
        <div className={styles['component-list__item']}>
          <span>PM10:</span> {airQuality?.components.pm10}
        </div>
        <div className={styles['component-list__item']}>
          <span>O3:</span> {airQuality?.components.o3}
        </div>
        <div className={styles['component-list__item']}>
          <span>NH3:</span> {airQuality?.components.nh3}
        </div>
      </div>
    </Card>
  );
}

export default AirQuality;
