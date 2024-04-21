import React from 'react'
import axios from 'axios'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';

const Sidebar = ({active_item}) => {
  const links = ["/employee", "/customer" , "/court-manage", "/training-program", "/product-manage"]
  const items = ["Employee", "Customer", "Court", "Training Program", "Product"];
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const logoutHandle = () => {
    axios.post('http://localhost:8080/auth/logout')
    .then(res => {
      if (res.data === 'success') {
        sessionStorage.clear();
        navigate('/login')
      }
    })
    .catch(err => console.log(err));
  }
    const btn_click = () => {
    const hambuger=document.querySelector("#toggle-btn");
    hambuger.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("expand");
  })
  };
  return (
    <aside id="sidebar">
      <div className="d-flex">
        <button id="toggle-btn" type="button" onClick={btn_click}>
          <i className="bx bxs-dashboard me-2"></i>
        </button>
        <div className="sidebar-logo">
          <a href="/">Dashboard</a>
        </div>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a href="/employee" className="sidebar-link">
            <i className="lni lni-user"></i>
            <span>Employee</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/customer" className="sidebar-link">
            <i className="lni lni-agenda"></i>
            <span>Customer</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/court-manage" className="sidebar-link">
            <i className="lni lni-layout"></i>
            <span>Court</span>
          </a>
          
        </li>
        <li className="sidebar-item">
          <a href="/training-program" className="sidebar-link">
            <i className="lni lni-popup"></i>
            <span>Training Program</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/product-manage" className="sidebar-link">
            <i className="lni lni-cog"></i>
            <span>Product</span>
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="/login" className="sidebar-link">
          <i className="lni lni-exit"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
 
  )
}

export default Sidebar