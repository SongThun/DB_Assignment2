import React from 'react'
import './sidebar.css'

const sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="container1">
          <a className="bt1" href='/dashboard/employee' >Employee</a>
          <a className="bt1" >Manage Court</a>
          <a className="bt1" >Training Program</a>
          <a className="bt1" >Product</a>
          <a className="bt1" >Customer</a>
        </div>
      </div>
    </div>
  )
}

export default sidebar
