import React, {useEffect} from 'react'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Table from '../components/Table.jsx'
import Tabledashboard from '../components/TableDashboard.jsx'
import './Dashboard.css'
import Card from '../components/Card.jsx'
import DataTitle from '../components/DataTitle.jsx'
import CardDashboard from '../components/CardDashboard.jsx'

const Dashboard = () => {
  axios.defaults.withCredentials=true;
  const main_http='http://localhost:8080/dashboard/frequency/';
  const sub_http='http://localhost:8080/dashboard/GetCurrentShiftDetails/';
  const sub2_http='http://localhost:8080/dashboard/CalculateMembershipPercentage/';
  const header=['Court ID','Number of time rented']
  const labels=['Court ID','Number of time rented']
  const sortlabels=['Court ID','Number of time rented']
  const constraints={}
  const feedback={}
  
  const SubmitAdd = (values, reloadData) => {
    axios.post(main_http, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        console.log(msg)
      }
      else reloadData(res.data.result,true)
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
      else reloadData(res.data,false)
    })
    .catch(err => console.log(err));
  }

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
            <div className="col background1 container-fluid">
                <div className="sticky-top border-bottom mb-4 container-fluid"><Navbar/></div>
                <div className="hello">
                  <h2>Welcome back,</h2>
                  <h1>{sessionStorage.getItem('username')}!</h1>
                </div>
                <div id="cards" className="container-fluid row gap-3">
                  <Card href="/salary" card_title="Employee's salary"/>
                  <Card href="/membership" card_title="Membership"/>
                </div>
                <div className='d-inline align-items-center justify-content-center'>
                    <CardDashboard icon="lni lni-home" size={70} name="Number Courts" />
                    <CardDashboard icon="lni lni-customer" size={70} name="Number Customer"/>
                    <CardDashboard icon="lni lni-handshake" size={70} name="Number Membership"/>
                    <CardDashboard icon="lni lni-revenue" size={70} name="Total revenue"/>
                </div>
                <div className="row">
                <div className='col'>
                  <h2 className='text-center'>The top frequency court that has been rented</h2>
                  <Tabledashboard
                    table_size="sm"
                    table="Frequency"
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
                  <div className="col">
                    <div className="row">
                    <h2 className='text-center'>Employees at the current shift</h2>
                  <Tabledashboard
                    table_size="sm"
                    table="Frequency"
                    sortlabels={sortlabels}
                    labels={labels}
                    constraints={constraints}
                    feedback={feedback}
                    main_http={sub_http}
                    submitEdit={SubmitEdit}
                    submitAdd={SubmitAdd}
                    header={header}
                    crud="true"
                  />
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Dashboard