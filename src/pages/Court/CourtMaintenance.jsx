import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios'

const CourtMaintenance = () => {
  axios.defaults.withCredentials=true;
  
  const main_http = 'http://localhost:8080/court-manage/info_main';
  const constraints = {
    // court_id: {
    //   type: "number",
    //   min: 1,
    //   max: 20,
    //   required: true,
    // },
    // court_price: {
    //   pattern: "[0-9]*\.?[0-9]*"
    // },
    // running_cost: {
    //   pattern: "[0-9]*\.?[0-9]*"
    // }
    court_id:{
      required: true
    }
  }

  const feedback = {
    // court_price: "Must be a decimal value (.00)", 
    // running_cost: "Must be a decimal value (.00)"
  }
  const labels =['Manager ID', 'Court ID', 'Maintenance','Date','Cost']
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
          alert('Duplicate entry for court_id (primary key)');
      }
      else reloadData(res.data,false)
    })
    .catch(err => console.log(err));
  }
  const header=['Manager ID','CID','Mantenance','Maintaining Date','Cost']
  const sortlabels=['Manager ID','CID','Mantenance','Maintaining Date','Cost']

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
			
						<Sidebar active_item="Court"/>
					

					<div className="col background1 container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href="/court-manage" goBack="true"/>
            </div>

						<div>
              <Table 
                table_size="lg"
                table="Court Maintenance"
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

export default CourtMaintenance;