import React, {useEffect} from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Dashboard = () => {
  axios.defaults.withCredentials=true;

  const navigate=useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('username')) {
      alert('Please login');
      navigate('/login');
    }
  }, [])
  return (
    <div className="container-fluid min-vh-100" >
        <div className="row">
              <Sidebar/>
            <div className="col background container-fluid">
                <div className="sticky-top border-bottom mb-4 container-fluid"><Navbar/></div>
                <div className="">
                  <h2>Welcome back,</h2>
                  <h1>{sessionStorage.getItem('username')}!</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard