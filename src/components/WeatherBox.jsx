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

const WeatherBox = ({ weather, forecast, timezone }) => {
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
  };

  const toCelsius = (Kelvin) => {
    return Kelvin - 273.15;
  };

  useEffect(() => {
    getCurrentDate();
  }, [timezone]);

  return (
    <div className='weatherBox'>
      <div className='weatherBox__container'>
        <div className='weatherBox__location'>
          <p>Current Location</p>
          <h3>
            <FontAwesomeIcon
              icon={faLocationDot}
              className='weatherBox__locationDot'
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
                className='weatherBox__icon'
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
      <div className='weatherBox__forecast'>
        {/* forecast 배열이 존재하고 길이가 0보다 크다면 */}
        {forecast &&
          forecast.length > 0 &&
          // 5일 예보 정보를 순회하면서 각 요소를 표시
          forecast.map((item, index) => (
            // 예보 정보를 표시하는 요소 생성
            <div key={index} className='forecast-item'>
              <p className='week'>{moment(item.dt_txt).format("ddd")}</p>
              <FontAwesomeIcon
                icon={weatherImage[item?.weather[0].icon]}
                className='weatherBox__forcastIcon'
              />
              <p>{Math.round(toCelsius(item.main.temp))}°</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherBox;
