import React, { useState, useEffect } from "react";
import "./WeatherBox.style.css";
import moment from "moment-timezone";

const WeatherBox = ({ weather, forecast, timezone }) => {

  const [todayDate, setTodayDate] = useState('');

  //Initial timeZone 'Australia/Sydney'

  const getCurrentDate = () => {
    let currentDate = moment().tz(timezone);
    const day = currentDate.format('ddd');
    const Date = currentDate.date();
    const month = currentDate.format('MMM');
    const year = currentDate.year();
    const hour = currentDate.format('HH');
    const minute = currentDate.format('mm');
    const today = `Today ${day} ${Date} ${month} ${year} ${hour}:${minute}`;
    setTodayDate(today);
  };

  const toCelsius = (Kelvin) => {
    console.log("f>>", Kelvin);
    return Kelvin - 273.15;
  };

  useEffect(() => {
    getCurrentDate();
  }, [timezone]);

  return (
    <div className='weatherBox'>
      <h2>Current Location</h2>
      <h3>{weather?.name}</h3>
      <p >{todayDate}</p>
      <div>Weather Image</div>
      <h1>{Math.round(toCelsius(weather?.main?.temp))}°</h1>
      <h2>
        H:{Math.round(toCelsius(weather?.main?.temp_max))}°|L:
        {Math.round(toCelsius(weather?.main?.temp_min))}°
      </h2>
      <p>{weather?.weather[0]?.description}</p>
      <p>Icon Humidity</p>
      <p>{weather?.main?.humidity}%</p>
      <p>Wind</p>
      <p>icon{Math.round(weather?.wind?.speed)}m/s</p>
      <div></div>
    </div>
  );
};

export default WeatherBox;
