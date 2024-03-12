import Card from '../../layout/Card';
import CityLocation from '../../models/CityLocation';
import Loader from '../../primitives/Loader';
import CurrentWeatherContent from './CurrentWeatherContent';
import CurrentWeatherFallback from './CurrentWeatherFallback';
import styles from './current-weather.module.css';

export type Weather = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
};

interface CurrentWeatherProps {
  weather: Weather | undefined;
  location: CityLocation;
}

function CurrentWeather({ weather, location }: CurrentWeatherProps) {
  return (
    <Card className={styles['current-weather']}>
      <Loader
        dependency={weather}
        content={
          <CurrentWeatherContent weather={weather!} location={location} />
        }
        fallback={<CurrentWeatherFallback />}
      />
    </Card>
  );
}

export default CurrentWeather;
