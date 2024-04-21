import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios'

const Program = () => {
  axios.defaults.withCredentials=true;
  
  const main_http = 'http://localhost:8080/training-program/training_program/';
  const constraints = {
    program_name: {
      type: "text",
      required: true
    },
    start_date: {
      type: "date",
      required: true
    },
    end_date: {
      type: "date",
      required: true
    },
    admission_fee: {
      pattern: "[0-9]*\.?[0-9]*"
    },
    maximum_admission: {
      type: "number",
      min: 0
    }
  }

  const feedback = {
    program_name: "Please provide a name for this program",
    start_date: "Please provide the start date",
    end_date: "Please provide the end date",
    admission_fee: "Fee must be a decimal number (.00)" 
  }

  const SubmitAdd = (values, reloadData) => {
    axios.post(main_http, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for court_id (primary key)');
      }
      else reloadData(res.data,true)
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
          alert('Duplicate entry for primary key');
      }
      else reloadData(res.data,false)
    })
    .catch(err => console.log(err));
  };
  const header=['Type','SDate','EDate','Schedule','Status','Fee','MoA','Coach ID']
  const labels=['Type','SDate','EDate','Schedule','Status','Fee','MoA','Coach ID']
  const sortlabels=['Type','SDate','EDate','Schedule','Status','Fee','MoA','Coach ID']

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
					
						<Sidebar active_item="Training Program"/> 
					
					<div className="col background1 container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href="/" goBack="true"/>
            </div>

						<div>
              <Table 
                table_size="lg"
                table="Training Program"
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

export default Program