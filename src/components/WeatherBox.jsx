import React from 'react'
import './WeatherBox.style.css';

const WeatherBox = ({weather}) => {


    const toCelsius = (Kelvin) => {
        console.log("f>>", Kelvin);
        return Kelvin - 273.15;
    }

  return (
    <div className='weatherBox'>
      <h2>Current Location</h2>
      <h3>{weather?.name}</h3>
      <div>Weather Image</div>
      <h1>{Math.round(toCelsius(weather?.main?.temp))}°</h1>
      <h2>H:{Math.round(toCelsius(weather?.main?.temp_max))}°|L:{Math.round(toCelsius(weather?.main?.temp_min))}°</h2>
      <p>{weather?.weather[0]?.description}</p>
      <p>Icon Humidity</p>
      <p>{weather?.main?.humidity}%</p>
      <p>Wind</p>
      <p>icon{Math.round(weather?.wind?.speed)}m/s</p>
    </div>
  )
}

export default WeatherBox
