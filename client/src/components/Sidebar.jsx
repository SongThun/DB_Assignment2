import React from 'react'
import axios from 'axios'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';


const Sidebar = ({active_item}) => {
  const links = ["/employee", "/court-manage", "/training-program", "/product-manage"]
  const items = ["Employee", "Court", "Training Program", "Product"];

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

  return (
    <aside id="sidebar">
      <div className="sidebar-logo m-3">
          <a href="/" className="fs-4 fw-semibold text-decoration-none text-white inline-flex  align-items-center">
            <i className='bx bxs-dashboard me-2'></i>
            <span>Dashboard</span>
          </a>
        </div>
      <div className="sidebar-nav list-group list-group-flush border-top border-bottom pb-2">
        {items.map((item, id) => {
          let options="bg-dark text-white"
          if (active_item == item) {
              options="bg-white text-dark fw-semibold rounded"
          };
          return <a key={id} className={`sidebar-item list-group-item ${options}`} href={links[id]}>
              <span>{item}</span>
            </a>
        })}
      </div>

      <div className="sidebar-footer mt-3">
        <button href="/logout" className="btn text-decoration-none text-white sidebar fs-6 d-flex align-items-center"
        onClick={logoutHandle}>
          <i className='bx bx-log-out-circle me-2' ></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar