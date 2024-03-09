import { useState } from 'react';
import AirQuality from './components/AirQuality';
import Container from './components/Container';
import CurrentWeather from './components/CurrentWeather';
import Grid from './components/Grid';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime from './components/SunTime';
import WeatherForecast from './components/WeatherForecast';

function App() {
  const [location, setLocation] = useState<SearchResult | null>(null);

  function searchLocation(result: SearchResult) {
    setLocation(result);
  }

  return (
    <Container>
      <Grid>
        <SearchBar onSubmit={searchLocation} />
        {location && (
          <>
            <CurrentWeather location={location} />
            <WeatherForecast location={location} />
            <AirQuality location={location} />
            <SunTime />
          </>
        )}
      </Grid>
    </Container>
  );
}

export default App;
