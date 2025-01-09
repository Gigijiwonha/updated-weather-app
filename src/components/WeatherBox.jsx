import React, { useState, useEffect } from "react";
import "./WeatherBox.style.css";
import moment from "moment-timezone";

const WeatherBox = ({ weather, forecast, timezone }) => {
  const [todayDate, setTodayDate] = useState("");

  //Initial timeZone 'Australia/Sydney'

  // fYI : 다음5일 날씨 계산할때 UTC시간을 시드니시간으로 바꾸는것고(그럼 도시가 바뀔때 각 도시의시간으로 변환해야함?), 각 위치별 도시별 현재시간을 구하는 방식(브라우저 기준 방법,, 그럼 시티는?,,,)은 다름.
  const getCurrentDate = () => {
    let currentDate = moment().tz(timezone);
    const day = currentDate.format("ddd");
    const Date = currentDate.date();
    const month = currentDate.format("MMM");
    const year = currentDate.year();
    const hour = currentDate.format("HH");
    const minute = currentDate.format("mm");
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
      <p>{todayDate}</p>
      <div>Weather Image</div>
      <h1>{Math.round(toCelsius(weather?.main?.temp))}°</h1>
      <h2>
        H:{Math.round(toCelsius(weather?.main?.temp_max))}°|L:
        {Math.round(toCelsius(weather?.main?.temp_min))}°
      </h2>
      <p>{weather?.weather[0]?.description}</p>
      <div className='weatherDetail-box'>
        <div className='weatherDetail-item'>
          <p>Icon Humidity</p>
          <p>{weather?.main?.humidity}%</p>
        </div>
        <div className='weatherDetail-item'>
          <p>Wind</p>
          <p>icon{Math.round(weather?.wind?.speed)}m/s</p>
        </div>
      </div>
      <div className='forecast-box'>
        {/* forecast 배열이 존재하고 길이가 0보다 크다면 */}
        {forecast &&
          forecast.length > 0 &&
          // 5일 예보 정보를 순회하면서 각 요소를 표시
          forecast.map((item, index) => (
            // 예보 정보를 표시하는 요소 생성
            <div key={index} className='forecast-item'>
              <p className='week'>{moment(item.dt_txt).format("ddd")}</p>
              {/* <div className='icon-box row-center'>
                <FontAwesomeIcon icon={icons[item.weather[0].description]} className='weather-icon2 row-center' />
              </div> */}
              <p>{Math.ceil(item.main.temp)}°C</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherBox;
