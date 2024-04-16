import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios';
import moment from 'moment';

const Staff = () => {
  axios.defaults.withCredentials=true;
  
  const main_http = 'http://localhost:8080/employee/staff/';
  const constraints = {
    staff_id: {
      type: "text",
      minLength: 8,
      maxLength: 8,
      required: true,
      pattern: "[A-Z]{3}[0-9]{5}"
    },
    ssn: {
      type: "text",
      minLength: 12,
      maxLength: 12,
      required: true,
      pattern: "[0-9]{12}"
    },
    email: {
      type: "email",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    },
    dob: {
      type: "date",
      max: moment(new Date()).format('YYYY-MM-DD')
    }
  }

  const feedback = {
    staff_id: "ID must have 8 characters, first 3 characters must be uppercase letters.\nEx: RCT00001",
    ssn: "SSN must be a valid 12-digit social security number",
    email: "Please provide a valid email"
  }

  const SubmitAdd = (values, reloadData) => {
    axios.post(main_http, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for court_id (primary key)');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  }
      
  const SubmitEdit = (pk, values, reloadData) => {
    let params = '';
    for (const key in pk) {
      params += `${pk[key]}/`;
    }
    axios.put(main_http + params, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for staff_id (primary key)');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
					<div className="col-2 bg-dark vh-100 sticky-start">
						<Sidebar active_item="Employee"/>
					</div>

					<div className="col container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href=""/>
            </div>

						<div>
              <Table 
                table_size="sm"
                table="Staff"
                constraints={constraints}
                feedback={feedback}
                main_http={main_http}
                submitEdit={SubmitEdit}
                submitAdd={SubmitAdd}
                crud="true"
              />
						</div>
					</div>
        </div>
    </div>

  )
}

export default Staff