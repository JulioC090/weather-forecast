import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AirQuality from './components/AirQuality';
import CurrentWeather from './components/CurrentWeather';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime, { SunPeriod } from './components/SunTime';
import WeatherForecast, { Forecast } from './components/WeatherForecast';
import Container from './layout/Container';
import Grid from './layout/Grid';

function App() {
  const storageLocation = localStorage.getItem('location');

  const [location, setLocation] = useState<SearchResult>(
    storageLocation ? JSON.parse(storageLocation) : undefined,
  );
  const [forecast, setForecast] = useState<Array<Forecast>>();
  const [sunPeriod, setSunPeriod] = useState<SunPeriod>();

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
    if (!location) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&cnt=8&lang=pt&appid=${import.meta.env.VITE_WEATHER_APP_KEY}`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((json) => {
        setForecast(json.list);
        setSunPeriod({
          sunset: json.city.sunset * 1000,
          sunrise: json.city.sunrise * 1000,
        });
      });
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
              <CurrentWeather location={location} />
              <WeatherForecast forecast={forecast} />
              <AirQuality location={location} />
              <SunTime sunPeriod={sunPeriod} />
            </>
          )}
        </Grid>
      </Container>
    </SkeletonTheme>
  );
}

export default App;
