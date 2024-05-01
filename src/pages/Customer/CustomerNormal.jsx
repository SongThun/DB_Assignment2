import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import Card from '../../components/Card.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios';
import moment from 'moment';

const CustomerNormal = () => {
  axios.defaults.withCredentials=true;
  const main_http = 'http://localhost:8080/customer/customer/';
  const constraints = {
    name:{
      type:"text",
      required:true,
    },
    phone:{
      type:"text",
      required:true,
      minLength: 10,
      maxLength: 10
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
        console.log(msg)
        if (msg.includes('staff.PRIMARY'))
          alert('Duplicate entry for Staff ID!');
        if (msg.includes('staff_jobtitle')) {
          alert('Invalid job title!');
        }
        if (msg.includes('staff.ssn')){
          alert('Duplicate entry for Staff SSN!');
        }
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
      console.log(res);
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        console.log(msg)
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for staff_id (primary key)');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  };
  const labels=['Phone','Name']
  const sortlabels=['Phone','Name']
  const header=['Phone','Name']

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">

						<Sidebar active_item="Customer"/>


					<div className="col background1 container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href="/" goBack="true"/>
            </div>

            <div id="cards" className="container-fluid row gap-3">
              <Card href="/customer" card_title="Register Membership"/>
            </div>
            
						<div>
              <Table 
                table_size="sm"
                table="Customer Information"
                sortlabels={sortlabels}
                labels={labels}
                constraints={constraints}
                feedback={feedback}
                main_http={main_http}
                submitEdit={SubmitEdit}
                submitAdd={SubmitAdd}
                header={header}
                crud="true"
              />
						</div>
					</div>
        </div>
    </div>

  )
}

export default CustomerNormal