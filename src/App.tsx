import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AirQuality, { AirQualityValues } from './components/AirQuality';
import CurrentWeather, { Weather } from './components/CurrentWeather';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime, { SunPeriod } from './components/SunTime';
import WeatherForecast, { Forecast } from './components/WeatherForecast';
import GeoDBLocationGateway from './gateways/GeoDBSearchLocationsGateway';
import OpenWeatherGateway from './gateways/OpenWeatherGateway';
import Container from './layout/Container';
import Grid from './layout/Grid';

const locationGateway = new GeoDBLocationGateway();
const weatherGateway = new OpenWeatherGateway(
  import.meta.env.VITE_WEATHER_APP_KEY,
);

function App() {
  const storageLocation = localStorage.getItem('location');

  const [location, setLocation] = useState<SearchResult>(
    storageLocation ? JSON.parse(storageLocation) : undefined,
  );
  const [forecast, setForecast] = useState<Array<Forecast>>();
  const [sunPeriod, setSunPeriod] = useState<SunPeriod>();
  const [airQuality, setAirQuality] = useState<AirQualityValues>();
  const [weather, setWeather] = useState<Weather>();

  function searchLocation(result: SearchResult) {
    setLocation(result);
    localStorage.setItem('location', JSON.stringify(result));
  }

  useEffect(() => {
    async function fetchData() {
      const {
        currentWeatherResponse,
        weatherForecastResponse,
        airQualityResponse,
        sunPeriodResponse,
      } = await weatherGateway.getWeatherInformation(location);

      setWeather(currentWeatherResponse);
      setForecast(weatherForecastResponse);
      setAirQuality(airQualityResponse);
      setSunPeriod(sunPeriodResponse);
    }

    if (!location) return;
    fetchData();
  }, [location]);

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
