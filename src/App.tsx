import { useEffect, useState } from 'react';
import AirQuality from './components/AirQuality';
import Container from './components/Container';
import CurrentWeather from './components/CurrentWeather';
import Grid from './components/Grid';
import SearchBar, { SearchResult } from './components/SearchBar';
import SunTime, { SunPeriod } from './components/SunTime';
import WeatherForecast, { Forecast } from './components/WeatherForecast';

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
    <Container>
      <Grid>
        <SearchBar
          onQueryChange={getLocationSuggestions}
          onSubmit={searchLocation}
        />
        {location && sunPeriod && (
          <>
            <CurrentWeather location={location} />
            <WeatherForecast forecast={forecast} />
            <AirQuality location={location} />
            <SunTime sunPeriod={sunPeriod} />
          </>
        )}
      </Grid>
    </Container>
  );
}

export default App;
