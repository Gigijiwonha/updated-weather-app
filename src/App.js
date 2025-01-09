import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import CityButton from "./components/CityButton";
import moment from "moment-timezone";

// 1. Displaying the current weather info as soon as the app launches.
// 2. Weather info : City name, Weather Img, Celsius, Current Weather, xtr info, Next 5days weather info.
// 3. Display other cities name when the users click the button next to current city name.
// 4. Add animation effect to Weather Img.
// 5. Loading spinner.

function App() {
  const cities = ["Seoul", "Berlin", "New York"];
  const cityTimezone = {
    Seoul: "Asia/Seoul",
    Berlin: "Europe/Berlin",
    NewYork: "America/New_York",
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
        let convertTimezoneList = forecastData.list.map((item) => ({
          ...item,
          dt_txt: moment
            .utc(item.dt_txt)
            .tz(timezone)
            .format("YYYY-MM-DD HH:mm:ss"),
        }));
        console.log("Time to Sydney", convertTimezoneList);

        const filteredTimezone = convertTimezoneList.filter((item, index) =>
          item.dt_txt.includes("14:00:00")
        );
        console.log("filtered Sydney Time 14", filteredTimezone);

        const currentDate = moment().tz(timezone).format("YYYY-MM-DD");

        const finalForecast = filteredTimezone?.[0]?.dt_txt.startsWith(
          currentDate
        )
          ? filteredTimezone.slice(1, 5)
          : filteredTimezone.slice(0, 4);
          
        setForecast(finalForecast);
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

      setWeather(weatherDataByCity);
      setForecast(forcastDataByCity);

      console.log("CityWeatherdata>>>", weatherDataByCity);
      console.log("CityForecastdata>>>", forcastDataByCity);
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
    <div>
      <WeatherBox weather={weather} forecast={forecast} timezone={timezone} />
      <CityButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
