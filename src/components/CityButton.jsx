import React, { useEffect, useRef, useState } from "react";
import "./CityButton.style.css";

const CityButton = ({ cities, setCity, activeCity, setActiveCity }) => {

  const handleActive = (city) => {
    setCity(city);
    setActiveCity(city);
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
