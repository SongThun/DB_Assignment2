import React from 'react'
import './CardDashboard.css'

const CardDashboard = ({icon,size,name}) => {
  return (
    <div className='card d-inline-block'>
      <img src="" alt="" />
      <div className="row align-items-center justify-content-center">
        <div className="col text-center">
        <i className={icon} style={{fontSize:size}}></i>
        </div>
        <div className="col">
          <div className='row '><h3>{name}</h3></div>
          <div className='row '><h4>2</h4></div>
        </div>
      </div>
      
    </div>
  )
}

export default CardDashboard
