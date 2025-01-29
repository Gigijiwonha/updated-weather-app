import React from "react";
import moment from "moment-timezone";
import "./CityButton.style.css";

const CityButton = ({ cities, setCity, activeCity, setActiveCity, setTimezone, cityTimezone }) => {

  const handleActive = (city) => {
    setCity(city);
    setActiveCity(city);
    setTimezone(city ? cityTimezone[city] : moment.tz.guess());
  };

  return (
    <div className='citybtn-Box'>
      <button
        onClick={() => handleActive("")}
        className={`cityBtn ${activeCity === "" ? "active" : ""}`}
      >
        {" "}
        Current Location{" "}
      </button>
      {cities.map((item) => (
        <button
          onClick={() => handleActive(item)}
          className={`cityBtn ${activeCity === item ? "active" : ""}`}
        >
          {" "}
          {item}{" "}
        </button>
      ))}
    </div>
  );
};

export default CityButton;
