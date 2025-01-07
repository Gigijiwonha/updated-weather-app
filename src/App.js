import "./App.css";
import { useEffect } from "react";

// 1. Displaying the current weather info as soon as the app launches.
// 2. Weather info : City name, Weather Img, Celsius, Current Weather, xtr info, Next 5days weather info.
// 3. Display other cities name when the users click the button next to current city name.
// 4. Add animation effect to Weather Img.
// 5. Loading spinner.

function App() {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getCurrentWeather(lat, lon);
    });
  };

  const getCurrentWeather = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38a63e7b6d9d409e80c797942ae598c0`
    let response = await fetch(url);
    let data = await response.json();
    console.log("data>>>",data);
  }

  useEffect(() => {
    getCurrentLocation();
    console.log("first")
  }, []);

  return <div>hello</div>;
}

export default App;
