import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import { Form } from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker'
import {timeFromInt} from 'time-number';
import moment from 'moment'
import Table from '../../components/Table.jsx'
import axios from 'axios'

const CourtRentalCU = ({edit}) => {
  axios.defaults.withCredentials=true;

  const main_http = "http://localhost:8080/court-manage/court_rental/";
  
  const [records, setRecords] = useState([])
  const [data, setData] = useState({});
  const [values, setValues] = useState({
    court_id: '',
    court_date: '',
    start_time: '',
    end_time: '',
    cus_phone: '',
    booking_method: '',
    receptionist_id: ''
  });

  const constraints = {}
  const feedback = {}
  
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
          alert('Duplicate entry for court_id (primary key)');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  }

  const findCourt = (e) => {
    e.preventDefault();
    const body = {
      court_date: values.court_date,
      start_time: values.start_time,
      end_time: values.end_time
    }
    axios.post(main_http + "available", body)
    .then(res => {
      if (res.data.err) console.log(res.data.err);
      setData(res.data);
      console.log(data);
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
          <div className="col-2 bg-dark vh-100">
              <Sidebar active_item="Court"/>
          </div>

          <div className="col container-fluid">
              <div className="sticky-top border-bottom mb-4 container-fluid">
                <Navbar goBack="true" href="/court-manage"/>
              </div>

              <div id="main">
                <h3>Court Reservation</h3>

                <Form id="find-court-form" className="d-flex align-items-end">
                  <Form.Group className="">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                      type="date"
                      value={values.court_date}
                      min={moment(new Date())}
                      max={moment(new Date()).add(7, 'days')}
                      onChange={(e) => setValues({...values, court_date: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="ms-3">
                    <Form.Label>Start</Form.Label>
                    <TimePicker 
                      start="07:00" 
                      end="21:30" 
                      step={30}
                      format={24}
                      value= {values.start_time}
                      onChange={(time) => {
                        const t =timeFromInt(parseInt(time) + 30 * 60);
                        setValues({...values, start_time: timeFromInt(parseInt(time)), end_time: t});
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="ms-3">
                    <Form.Label>End</Form.Label>
                    <TimePicker 
                      start="07:30" 
                      end="22:00" 
                      step={30}
                      format={24}
                      value={values.end_time}
                      onChange={(time) => {
                        setValues({...values, end_time: timeFromInt(parseInt(time))})
                      }}
                    />
                  </Form.Group>
                  <button className="btn btn-dark ms-3" type="submit"
                    onClick={findCourt}>Find</button>
                </Form>

                {/* <Table 
                  table_size="lg"
                  table="Court Rental"
                  constraints={constraints}
                  feedback={feedback}
                  main_http={main_http}
                  submitEdit={SubmitEdit}
                  submitAdd={SubmitAdd}
                  rental="true"
                  data={data}
                /> */}
                <div>
                  
                </div>
              </div>
          </div>
      </div>
    </div>

  )
}

export default CourtRentalCU