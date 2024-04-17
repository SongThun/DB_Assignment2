import React from 'react'
import axios from 'axios'
import './Navbar.css'

const Navbar = ({goBack, href}) => {
  axios.defaults.withCredentials=true;
  return (
    <div className="mt-2 mb-2 row d-flex align-items-center">
      {
        goBack && (
          <div className="col align-self-left">
              <a href={href} className="text-decoration-none nav-link link-dark d-flex align-items-center" >
                <i className='bx bx-arrow-back me-2'></i>
                Back
              </a>
          </div>
          
        )
      }
      <div className="col fw-semibold align-self-right d-flex flex-row-reverse align-items-center justify-content-space-between">
        <i className='fs-3 bx bx-user-circle'></i>
        <span className='fs-5 me-2'>{sessionStorage.getItem('username')}</span>
      </div>
    </div>
  )
}

export default Navbar