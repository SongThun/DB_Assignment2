import React from 'react'
import Sidebar from '../sidebar/sidebar.jsx'
import Navbar from '../navbar/navbar.jsx'
import './receptionist.css'
const receptionist = () => {
  return (
    <div className='body'>
      <Sidebar/>
      <Navbar/>
      <div className="container_back">
    <a href="/dashboard/employee" className="back_button">Back</a>
    <div className="container_table_emp">
      <table>
        <div></div>
        <h1 className="h1_name"><p className="h1_pa">Receptionist</p>  
        <div className='container_add'>
          <a className="h1_pa_add">Add new</a>
          <a className="h1_pa_add2">Manipulate</a>
          <a className="h1_pa_add3">Delete</a>
        </div>
        </h1> <table className="table_emp">
          <thead>
          <tr>
              <th className="attribute">SSN</th>
              <th className="attribute">Staff ID</th>
              <th className="attribute">Name</th>
              <th className="attribute">Email</th>
              <th className="attribute">Address</th>
              <th className="attribute">Date of Birth</th>
              <th className="attribute">Job_title</th>
              <th className="attribute">Wage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>012</td>
              <td>123456789</td>
              <td>Haha</td>
              <td>haha@gmail.com</td>
              <td>HCM City</td>
              <td>01/01/2000</td>
              <td>Facility Manager</td>
              <td>18.000.000 M</td>
            </tr>
            
          </tbody>
        </table>
      </table>
    </div>
  </div>
    </div>
  )
}

export default receptionist
