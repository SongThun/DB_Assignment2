import React,{useState, useEffect} from 'react'
import './CardDashboard.css'
import axios from 'axios';

const CardDashboard = ({icon,size,name, main_http}) => {
  const [records,setRecords] =useState([]);
  //const main_http='http://localhost:8080/dashboard/card/membership-percentage/'
  useEffect(() => {
    axios.get(main_http)
    .then(res => {
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        setRecords(res.data.result);
      }
    })
  });

  return (
    <div className='card d-inline-block'>
      <img src="" alt="" />
      <div className="row align-items-center justify-content-center">
        <div className="col text-center">
        <i className={icon} style={{fontSize:size}}></i>
        </div>
        <div className="col">
          <div className='row '><h3>{name}</h3></div>
          <div className='row '><h4>{records}</h4></div>
        </div>
      </div>
      
    </div>
  )
}

export default CardDashboard
