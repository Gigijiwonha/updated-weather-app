import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import CityButton from "./components/CityButton";
import moment from "moment-timezone";
import bgImage from "./assets/bgimage.jpg";
import PuffLoader from "react-spinners/PuffLoader";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  const [hourlyForecast, setHourlyForecast] = useState();
  const [city, setCity] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const [timezone, setTimezone] = useState(moment.tz.guess()); //Guessing the current timezone based on user's browser
  const [activeNightMode, setActiveNightMode] = useState(false);
  const [loading, setLoading] = useState(false);

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

    const getConvertedHourlyForcastData = forecastData?.list.map((item) => ({
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

    const finalHourlyForecast = getConvertedHourlyForcastData.slice(0,7);

    setForecast(finalForecast);
    setHourlyForecast(finalHourlyForecast);
    console.log("Hourly forecast>>>", finalHourlyForecast);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCityName = async (city) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCityName(city);
    }
  }, [city, activeCity, activeNightMode]);

  return (
    <div className='weather-app'>
      <div className='weather-bg'>
        <img src={bgImage} alt='Weather Background' />
      </div>
      {loading ? (
        <div className='loading-container'>
          <PuffLoader color='#00c9ff' size={150} className='loadingSpinner' />
          <p className='loading-text'>
            Just a moment! The clouds are saying something!
          </p>
        </div>
      ) : (
        <div className='weather-container'>
          <WeatherBox
            weather={weather}
            forecast={forecast}
            timezone={timezone}
            hourlyForecast={hourlyForecast}
            activeNightMode={activeNightMode}
            setActiveNightMode={setActiveNightMode}
          />
          <CityButton
            cities={cities}
            setCity={setCity}
            activeCity={activeCity}
            setActiveCity={setActiveCity}
            setTimezone={setTimezone}
            cityTimezone={cityTimezone}
          />
        </div>
      )}
    </div>
  );
}

export default App;
