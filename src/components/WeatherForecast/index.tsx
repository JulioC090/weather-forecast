import Card from '../../layout/Card';

import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Line, LineChart } from 'recharts';
import BrowserView from '../../primitives/BrowserView';
import Loader from '../../primitives/Loader';
import WeatherForecastContent from './WeatherForecastContent';
import WeatherForecastFallback from './WeatherForecastFallback';
import styles from './weather-forecast.module.css';

export type Forecast = {
  dt: number;
  main: { temp: number };
  weather: [{ main: string; icon: string }];
};

interface WeatherForecastProps {
  forecast: Array<Forecast> | undefined;
}

function WeatherForecast({ forecast }: WeatherForecastProps) {
  const forecastListRef = useRef<HTMLDivElement>(null);

  const [listWidth, setListWidth] = useState(
    forecastListRef.current?.scrollWidth,
  );

  function handleWindowSizeChange() {
    setListWidth(forecastListRef.current?.scrollWidth);
  }

  useEffect(() => {
    setListWidth(forecastListRef.current?.scrollWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [forecastListRef]);

  return (
    <Card className={styles['weather-forecast']}>
      <h2>Previsão do Tempo</h2>
      <div className={styles['weather-forecast__list__wrapper']}>
        <div ref={forecastListRef} className={styles['weather-forecast__list']}>
          <Loader
            dependency={forecast}
            content={<WeatherForecastContent forecast={forecast!} />}
            fallback={<WeatherForecastFallback />}
          />
        </div>
        <BrowserView>
          <Loader
            dependency={forecast}
            content={
              <LineChart
                width={listWidth}
                height={247}
                data={forecast?.map((forecast) => ({
                  temp: Math.round(forecast.main.temp),
                }))}
              >
                <Line
                  type="monotone"
                  dataKey="temp"
                  dot={false}
                  stroke="#f59e0b"
                />
              </LineChart>
            }
            fallback={<Skeleton width={listWidth} height={247} />}
          />
        </BrowserView>
      </div>
    </Card>
  );
}

export default WeatherForecast;
