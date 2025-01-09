import React from 'react'
import './CityButton.style.css';

const CityButton = ({cities, setCity}) => {
  return (
    <div>
      <button onClick={()=>setCity('')}> Current Location </button>
      {cities.map((item) => (
        <button onClick={()=> setCity(item)}> {item} </button>
      ))}
    </div>
  )
}

export default CityButton
