import Card from '../Card';

import styles from './weather-forecast.module.css';
import { formatHour } from '../../utils/formatDate';
import BrowserView from '../BrowserView';
import { Line, LineChart } from 'recharts';
import { useEffect, useRef, useState } from 'react';

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
          {forecast &&
            forecast.map((forecast) => (
              <div
                className={styles['weather-forecast__item']}
                key={forecast.dt}
              >
                <span className={styles['weather-forecast__item__hour']}>
                  {formatHour(new Date(forecast.dt * 1000))}
                </span>
                <img
                  className={styles['weather-forecast__item__image']}
                  src={`./${forecast.weather[0].icon}.svg`}
                  alt={forecast.weather[0].main}
                />
                <span className={styles['weather-forecast__item__temperature']}>
                  {Math.round(forecast.main.temp)}
                </span>
              </div>
            ))}
        </div>
        <BrowserView>
          <LineChart
            width={listWidth}
            height={247}
            data={forecast?.map((forecast) => ({
              temp: Math.round(forecast.main.temp),
            }))}
          >
            <Line type="monotone" dataKey="temp" dot={false} stroke="#f59e0b" />
          </LineChart>
        </BrowserView>
      </div>
    </Card>
  );
}

export default WeatherForecast;
