import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AirQuality, { AirQualityValues } from './components/AirQuality';
import CurrentWeather, { Weather } from './components/CurrentWeather';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime, { SunPeriod } from './components/SunTime';
import WeatherForecast, { Forecast } from './components/WeatherForecast';
import OpenWeatherGateway from './gateways/OpenWeatherGateway';
import Container from './layout/Container';
import Grid from './layout/Grid';

const gateway = new OpenWeatherGateway(import.meta.env.VITE_WEATHER_APP_KEY);

function App() {
  const storageLocation = localStorage.getItem('location');

  const [location, setLocation] = useState<SearchResult>(
    storageLocation ? JSON.parse(storageLocation) : undefined,
  );
  const [forecast, setForecast] = useState<Array<Forecast>>();
  const [sunPeriod, setSunPeriod] = useState<SunPeriod>();
  const [airQuality, setAirQuality] = useState<AirQualityValues>();
  const [weather, setWeather] = useState<Weather>();

  async function getLocationSuggestions(query: string) {
    const response = await fetch(
      `https://corsproxy.io/?http://geodb-free-service.wirefreethought.com/v1/geo/places?namePrefix=${query}&hateoasMode=false&languageCode=pt_BR&limit=5&offset=0`,
      { method: 'GET' },
    );

    const data = await response.json();

    return data.data;
  }

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
      } = await gateway.getWeatherInformation(location);

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
            onQueryChange={getLocationSuggestions}
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
