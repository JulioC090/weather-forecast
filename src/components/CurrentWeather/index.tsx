import Card from '../../layout/Card';
import CityLocation from '../../models/CityLocation';
import Weather from '../../models/Weather';
import Loader from '../../primitives/Loader';
import CurrentWeatherContent from './CurrentWeatherContent';
import CurrentWeatherFallback from './CurrentWeatherFallback';
import styles from './current-weather.module.css';

interface CurrentWeatherProps {
  weather?: Weather;
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
