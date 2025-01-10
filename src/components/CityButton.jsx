import React from 'react'
import './CityButton.style.css';

const CityButton = ({cities, setCity}) => {
  return (
    <div className='citybtn-Box'>
      <button onClick={()=>setCity('')}> Current Location </button>
      {cities.map((item) => (
        <button onClick={()=> setCity(item)}> {item} </button>
      ))}
    </div>
  )
}

export default CityButton
