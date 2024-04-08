import React from 'react'
import Sidebar from '../sidebar/sidebar.jsx'
import Navbar from '../navbar/navbar.jsx'
import './facilitymanager.css'
const facilitymanager = () => {
  return (
    <div>
      <Sidebar/>
      <Navbar/>
      <div className="container_back">
    <a href="/dashboard/employee" className="back_button">Back</a>
    <div className="container_table_emp">
      <table>
        <div></div>
        <h1 className="h1_name"><p className="h1_pa">Facility Manager</p>  
        <div className='container_add'>
        <a className="h1_pa_add">Add new</a>
          <a className="h1_pa_add2">Manipulate</a>
          <a className="h1_pa_add3">Delete</a>
        </div>
    
        </h1>
        <table className="table_emp">
          <thead>
            <tr>
              <th className="attribute">SSN</th>
              <th className="attribute">Staff ID</th>
              <th className="attribute">Name</th>
              <th className="attribute">Email</th>
              <th className="attribute">Address</th>
              <th className="attribute">Date of Birth</th>
              <th className="attribute">Job_title</th>
              <th className="attribute">Year of Exp</th>
              <th className="attribute">Certification</th>
              <th className="attribute">Budget</th>
              <th className="attribute">Salary Month</th>
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
              <td>3</td>
              <td>Bachelor</td>
              <td>10.000.000 M</td>
              <td>20.000.000 M</td>
            </tr>
            <tr>
              <td>012</td>
              <td>123456789</td>
              <td>Haha</td>
              <td>haha@gmail.com</td>
              <td>HCM City</td>
              <td>01/01/2000</td>
              <td>Facility Manager</td>
              <td>3</td>
              <td>Bachelor</td>
              <td>10.000.000 M</td>
              <td>20.000.000 M</td>
            </tr>
            <tr>
              <td>012</td>
              <td>123456789</td>
              <td>Haha</td>
              <td>haha@gmail.com</td>
              <td>HCM City</td>
              <td>01/01/2000</td>
              <td>Facility Manager</td>
              <td>3</td>
              <td>Bachelor</td>
              <td>10.000.000 M</td>
              <td>20.000.000 M</td>
            </tr>
            
          </tbody>
        </table>
      </table>
    </div>
  </div>
    </div>
  )
}

export default facilitymanager
