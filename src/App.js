import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";

// 1. Displaying the current weather info as soon as the app launches.
// 2. Weather info : City name, Weather Img, Celsius, Current Weather, xtr info, Next 5days weather info.
// 3. Display other cities name when the users click the button next to current city name.
// 4. Add animation effect to Weather Img.
// 5. Loading spinner.

function App() {
  const cities = ["Seoul", "Berlin", "New York"];

  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [city, setCity] = useState("");

  const API_KEY = "38a63e7b6d9d409e80c797942ae598c0";

  const fetchData = async (url) => {
    try {
      let response = await fetch(url);
      let weatherData = await response.json();
      return weatherData;
    } catch (error) {
      alert(error.message);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const weatherData = fetchData(weatherUrl);
      const forecastData = fetchData(forecastUrl);

      setWeather(weatherData);
      if (forecastData?.list) {
        setForecast(forecastData.list.filter((item, index) => item.dt_txt.includes()));
      }
      setCity('');

      console.log("Weatherdata>>>", weatherData);
      console.log("Forecastdata>>>", forecastData);
    } catch (error) {
      alert(error.message);
    }
  };

  const getWeatherByCityName = async (city) => {
    try {
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;

      const weatherDataByCity = fetchData(weatherUrl);
      const forcastDataByCity = fetchData(forecastUrl);

      setWeather(weatherDataByCity);
      setForecast(forcastDataByCity);

      console.log("CityWeatherdata>>>", weatherDataByCity);
      console.log("CityForecastdata>>>", forcastDataByCity);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCityName(city);
    }
  }, [city]);

  return (
    <div>
      <WeatherBox weather={weather} forecast={forecast} />
      <CityButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
