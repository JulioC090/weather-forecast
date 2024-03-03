import AirQuality from './components/AirQuality';
import Container from './components/Container';
import CurrentWeather from './components/CurrentWeather';
import Grid from './components/Grid';
import SearchBar from './components/SearchBar';
import SunTime from './components/SunTime';
import WeatherForecast from './components/WeatherForecast';

function App() {
  return (
    <Container>
      <Grid>
        <SearchBar />
        <CurrentWeather />
        <WeatherForecast />
        <AirQuality />
        <SunTime />
      </Grid>
    </Container>
  );
}

export default App;
