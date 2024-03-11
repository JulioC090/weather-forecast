import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AirQuality from './components/AirQuality';
import CurrentWeather from './components/CurrentWeather';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime from './components/SunTime';
import WeatherForecast from './components/WeatherForecast';
import GeoDBLocationGateway from './gateways/GeoDBSearchLocationsGateway';
import OpenWeatherGateway from './gateways/OpenWeatherGateway';
import useWeatherInformation from './hooks/useWeatherInformation';
import Container from './layout/Container';
import Grid from './layout/Grid';

const locationGateway = new GeoDBLocationGateway();
const weatherGateway = new OpenWeatherGateway(
  import.meta.env.VITE_WEATHER_APP_KEY,
);

function App() {
  const { location, setLocation, weather, forecast, airQuality, sunPeriod } =
    useWeatherInformation(weatherGateway);

  function searchLocation(result: SearchResult) {
    setLocation(result);
    localStorage.setItem('location', JSON.stringify(result));
  }

  return (
    <SkeletonTheme baseColor="#52525b" highlightColor="#71717a">
      <Container>
        <Grid>
          <SearchBar
            onQueryChange={async (query) =>
              await locationGateway.getLocation(query)
            }
            onSubmit={searchLocation}
          />
          {location && (
            <>
              <CurrentWeather weather={weather} location={location} />
              <WeatherForecast forecast={forecast} />
              <AirQuality airQuality={airQuality} />
              <SunTime sunPeriod={sunPeriod} />
            </>
          )}
        </Grid>
      </Container>
    </SkeletonTheme>
  );
}

export default App;
