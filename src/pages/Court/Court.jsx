import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import Card from '../../components/Card.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios'
import DataTitle from '../../components/DataTitle.jsx';

const CourtsManage = () => {
  axios.defaults.withCredentials=true;
  
  const main_http = 'http://localhost:8080/court-manage/court_rental/';

  const constraints = {};
  const feedback = {};

  const SubmitAdd = (values, reloadData) => {};
  const SubmitEdit = (pk, values, reloadData) => {};

  const editCondition = (record) => {
    // Concatenate date and start time strings
    const startDateTimeString = `${record.court_date}T${record.start_time}:00`;

    // Create Date objects
    const startDate = new Date(startDateTimeString);
    const now = new Date();
    if (startDate > now) return true;
    return false;
  }
  const handleEdit = (record) => {
    sessionStorage.setItem('beforeEdit', JSON.stringify(record));
    window.location.href="/court-manage/edit";
  }
  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
					<div className="col-2 bg-dark vh-100 sticky-start">
						<Sidebar active_item="Court Rental"/>
					</div>

					<div className="col container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href=""/>
            </div>
            
            <div id="cards" className="container-fluid row gap-3">
              <Card href="/court-manage/court" card_title="Courts"/>
              <Card href="/court-manage/maintenance" card_title="Court Maintenance"/>
            </div>

						<div>
              <DataTitle title="Court Rental" href='/court-manage/add'/>
              <Table 
                table_size="sm"
                table="Court Rental"
                constraints={constraints}
                feedback={feedback}
                main_http={main_http}
                handleEdit={handleEdit}
                submitEdit={SubmitEdit}
                submitAdd={SubmitAdd}
                crud="true"
                rental="true"
                editCondition={editCondition}
              />
						</div>
					</div>
        </div>
    </div>

  )
}

export default CourtsManage