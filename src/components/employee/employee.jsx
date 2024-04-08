import React from 'react'
import Navbar from '../navbar/navbar.jsx'
import Sidebar from '../sidebar/sidebar.jsx'
import './employee.css'

const employee = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <div className="employee">
        
        <div className="div_emp2">
          <div className="div_emp"><a className="p_empm" href="/dashboard/employee/facility_manager">Facility Manager</a></div>
          <div className="div_emp"><a className="p_empr" href="/dashboard/employee/receptionist">Receptionist</a></div>
        </div>

        <div className="div_emp2">
          <div className="div_emp"><a className="p_emps" href="/dashboard/employee/cleaning_staff">Cleaning Staff</a></div>
          <div className="div_emp"><a className="p_empc" href="/dashboard/employee/coach">Coach</a></div>
        </div>

      </div>
    </div>
  )
}

export default employee
