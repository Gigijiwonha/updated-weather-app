import React, { useState, useEffect } from "react";
import "./WeatherBox.style.css";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSun,
  faCloudSun,
  faCloudShowersHeavy,
  faCloudRain,
  faCloudBolt,
  faSnowflake,
  faSmog,
  faMoon,
  faCloudMoon,
  faLocationDot,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const WeatherBox = ({
  weather,
  forecast,
  timezone,
  hourlyForecast,
  activeNightMode,
  setActiveNightMode,
}) => {
  const weatherImage = {
    "01d": faSun,
    "02d": faCloudSun,
    "03d": faCloud,
    "04d": faCloud,
    "09d": faCloudShowersHeavy,
    "10d": faCloudRain,
    "11d": faCloudBolt,
    "13d": faSnowflake,
    "50d": faSmog,
    "01n": faMoon,
    "02n": faCloudMoon,
    "03n": faCloud,
    "04n": faCloud,
    "09n": faCloudShowersHeavy,
    "10n": faCloudRain,
    "11n": faCloudBolt,
    "13n": faSnowflake,
    "50n": faSmog,
  };

  const weatherIconColours = {
    "01d": "yellow",
    "02d": "yellow",
    "03d": "blue",
    "04d": "blue",
    "09d": "blue",
    "10d": "blue",
    "11d": "darkBlue",
    "13d": "blue",
    "50d": "darkBlue",
    "01n": "darkYellow",
    "02n": "darkYellow",
    "03n": "blue",
    "04n": "blue",
    "09n": "blue",
    "10n": "blue",
    "11n": "darkBlue",
    "13n": "blue",
    "50n": "darkBlue",
  };
  const weatherIconCode = weather?.weather[0].icon;
  const weatherIconColour = weatherIconColours[weatherIconCode];

  const [todayDate, setTodayDate] = useState("");

  //Initial timeZone 'Australia/Sydney'

  // fYI : 다음5일 날씨 계산할때 UTC시간을 시드니시간으로 바꾸는것고(그럼 도시가 바뀔때 각 도시의시간으로 변환해야함?), 각 위치별 도시별 현재시간을 구하는 방식(브라우저 기준 방법,, 그럼 시티는?,,,)은 다름.
  const getCurrentDate = () => {
    let currentDate = moment().tz(timezone);
    const day = currentDate.format("dddd");
    const Date = currentDate.date();
    const month = currentDate.format("MMM");
    const year = currentDate.year();
    const hour = currentDate.format("HH");
    const minute = currentDate.format("mm");
    const today = `${day} ${Date} ${month} ${hour}:${minute}`;
    setTodayDate(today);

    const unixTimestamp = currentDate.unix();
    const sunrise = weather?.sys.sunrise;
    const sunset = weather?.sys.sunset;

    if (unixTimestamp > sunrise && unixTimestamp < sunset) {
      setActiveNightMode(false);
    } else {
      setActiveNightMode(true);
    }
  };

  const toCelsius = (Kelvin) => {
    return Kelvin - 273.15;
  };

  useEffect(() => {
    getCurrentDate();
  }, [timezone]);

  return (
    <div
      className={`weatherBox ${activeNightMode === true ? "nightmode" : ""}`}
    >
      <div
        className={`weatherBox__container ${
          activeNightMode === true ? "nightmode" : ""
        }`}
      >
        <div className='weatherBox__location'>
          <p className='subTitle'>Current Location</p>
          <h3>
            <FontAwesomeIcon
              icon={faLocationDot}
              className='weatherBox__locationDot '
            />
            {weather?.name}
          </h3>
        </div>
        <div className='weatherBox__information'>
          <div className='weatherBox__date'>
            {/* <p>NOW</p> */}
            <p>{todayDate}</p>
          </div>
          <div className='weatherBox__currentWeather'>
            <div className='weatherBox__currentWeather__top'>
              <h1 className='weatherBox__tempCurrent'>
                {Math.round(toCelsius(weather?.main?.temp))}°
              </h1>
              <FontAwesomeIcon
                icon={weatherImage[weather?.weather[0].icon]}
                className={`weatherBox__icon ${weatherIconColour}`}
              />
            </div>
            <div className='weatherBox__currentWeather__buttom'>
              <p className='weatherBox__descText'>
                {weather?.weather[0]?.description}
              </p>
              <h2 className='weatherBox__tempMaxMin'>
                H: {Math.round(toCelsius(weather?.main?.temp_max))}° | L:{" "}
                {Math.round(toCelsius(weather?.main?.temp_min))}°
              </h2>
            </div>
          </div>
          <div className='weatherBox__detail'>
            <div className='weatherBox__detailItem'>
              <FontAwesomeIcon
                icon={faDroplet}
                className='weatherBox__humidityIcon'
              />
              <p>Humidity {weather?.main?.humidity}%</p>
            </div>
            <div className='weatherBox__detailItem'>
              <FontAwesomeIcon icon={faWind} className='weatherBox__windIcon' />
              <p>Wind {Math.round(weather?.wind?.speed)}m/s</p>
            </div>
          </div>
        </div>
      </div>
      <div className='weatherBox__hourlyForcast'>
        <p
          className='weatherBox__hourlyForcast__title'
        >
          Hourly Forecast
        </p>
        <div className='hourlyForcast__container'>
          {hourlyForecast?.map((item, index) => (
            <div className='hourlyForcast__item'>
              <p className='hourlyForcast__item__hour'>
                {moment(item.dt_txt).format("HH")}
              </p>
              <FontAwesomeIcon
                icon={weatherImage[item?.weather[0].icon]}
                className={`weatherBox__hourlyForcastIcon ${
                  weatherIconColours[item?.weather[0].icon]
                }`}
              />
              <p className='hourlyForcast__item__temp'>
                {Math.round(toCelsius(item.main.temp))}°
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='weatherBox__forecast'>
        {forecast &&
          forecast.length > 0 &&
          forecast.map((item, index) => (
            <div key={index} className='forecast__item'>
              <p className='forecast__item__week'>
                {moment(item.dt_txt).format("ddd")}
              </p>
              <FontAwesomeIcon
                icon={weatherImage[item?.weather[0].icon]}
                className={`weatherBox__forcastIcon ${
                  weatherIconColours[item?.weather[0].icon]
                }`}
              />
              <p className='forecast__item__temp'>
                {Math.round(toCelsius(item.main.temp))}°
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherBox;
