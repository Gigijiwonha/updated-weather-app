import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import CityButton from "./components/CityButton";
import moment from "moment-timezone";
import bgImage from "./assets/bgimage.jpg";

// 1. Displaying the current weather info as soon as the app launches.
// 2. Weather info : City name, Weather Img, Celsius, Current Weather, xtr info, Next 5days weather info.
// 3. Display other cities name when the users click the button next to current city name.
// 4. Add animation effect to Weather Img.
// 5. Loading spinner.

function App() {
  const cities = ["Seoul", "Berlin", "Toronto"];
  const cityTimezone = {
    Seoul: "Asia/Seoul",
    Berlin: "Europe/Berlin",
    Toronto: "America/Toronto",
  };

  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState(moment.tz.guess()); //Guessing the current timezone based on user's browser

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

  const convertForecastTimezone = (forecastData, timezone) => {
    const getFilteredForcastData = forecastData?.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    const getConvertedForcastData = getFilteredForcastData.map((item) => ({
      ...item,
      dt_txt: moment
        .utc(item.dt_txt)
        .tz(timezone)
        .format("YYYY-MM-DD HH:mm:ss"),
    }));

    const currentDate = moment().tz(timezone).format("YYYY-MM-DD");

    const finalForecast = getConvertedForcastData?.[0]?.dt_txt.startsWith(
      currentDate
    )
      ? getConvertedForcastData.slice(1, 5)
      : getConvertedForcastData.slice(0, 4);

    return setForecast(finalForecast);
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

      const weatherData = await fetchData(weatherUrl);
      const forecastData = await fetchData(forecastUrl);

      setWeather(weatherData);

      if (forecastData?.list) {
        convertForecastTimezone(forecastData, timezone);
      }
      setCity("");

      console.log("Weatherdata>>>", weatherData);
      console.log("Forecastdata>>>", forecastData);
    } catch (error) {
      alert(error.message);
    }
  };

  const getWeatherByCityName = async (city) => {
    try {
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

      const weatherDataByCity = await fetchData(weatherUrl);
      const forcastDataByCity = await fetchData(forecastUrl);
      const activeTimezone = cityTimezone[city];
      console.log("city forecast", forcastDataByCity);

      setWeather(weatherDataByCity);

      if (forcastDataByCity?.list) {
        convertForecastTimezone(forcastDataByCity, activeTimezone);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCityName(city);
    }
  }, [city]);

  return (
    <div className='weather-app'>
      <div className='weather-bg'>
        <img src={bgImage} alt='Weather Background' />
      </div>
      <WeatherBox weather={weather} forecast={forecast} timezone={timezone} />
      <CityButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
