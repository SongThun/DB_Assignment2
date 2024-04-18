import React, {useState} from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import { Form } from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker'
import {timeFromInt, timeToInt} from 'time-number';
import moment from 'moment'
import axios from 'axios'
import ModalForm from '../../components/ModalForm.jsx'
import Table from '../../components/Table.jsx'
import DataTitle from '../../components/DataTitle.jsx'


const CourtRental = ({edit}) => {
  axios.defaults.withCredentials=true;
  
  const main_http = "http://localhost:8080/court-manage/court_rental/";
  
  const min = 7 * 3600, max = 21 * 3600 + 30 * 60;
  const dateFormat = 'YYYY-MM-DD';
  const now = new Date();
  const nowTime = timeToInt(moment(now).format('HH:mm'));
  const minDate = nowTime > max ? moment(now).add(1, 'days').format(dateFormat) : moment(now).format(dateFormat);
  const maxDate = nowTime > max ? moment(now).add(8, 'days').format(dateFormat) : moment(now).add(7, 'days').format(dateFormat);
  const currentTime = timeToInt(moment(now).add(30 - now.getMinutes() % 30, 'minutes').format('HH:mm'))

  const [minTime, setMinTime] = useState(() => {
    if (nowTime < min || nowTime > max) {
      return min;
    }
    return currentTime;
  })
  const [minEndTime, setMinEndTime] = useState(minTime + 30 * 60);

  const [records, setRecords] = useState([])
  const [values, setValues] = useState(
   edit ? JSON.parse(sessionStorage.getItem('beforeEdit'))
    : { court_id: '',
        court_date: minDate, 
        start_time: timeFromInt(minTime),
        end_time: timeFromInt(minTime + 30 * 60),
        cus_phone: '',
        booking_method: 'At the counter',
        receptionist_id: '',
        cus_name: ''}
  );

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const labels = ['Court ID', 'Date', 'Start time', 'End time', 'Customer phone', 'Booking method', 'Receptionist ID',
                  "Customer name"];

  const constraints = {
    court_id: {
      type: "number",
      disabled:true
    },
    court_date: {
      type:"date",
      disabled:true
    },
    start_time: {
      disabled:true
    },
    end_time: {
      disabled:true
    },
    cus_phone: {
      minLength: 10,
      maxLength: 10,
      pattern: "[0-9]{10}",
      required: true
    },
    booking_method: {
      type: "select",
      select_options: ['At the counter', 'Online'],
      value: 'At the counter'
    },
    receptionist_id: {
      minLength: 8,
      maxLength: 8,
      pattern: "RCT[0-9]{5}",
      required: true
    },
    cus_name: {
      pClassName: "visually-hidden",
      pid:"cus-name"
    }
  }
  const feedback = {
    cus_phone: "Please enter valid phone number",
    receptionist_id: "Receptionist ID must have 8 characters, start with 'RCT'. Ex: RCT00001"
  }
  

  const findCourt = (e) => {
    e.preventDefault();
    const http = edit ? main_http + "edit" : main_http + "add";
    const body = edit ? { prev: JSON.parse(sessionStorage.getItem('beforeEdit')),
                          new: values} : values;
    axios.post(http, body)
    .then(res => {
      setRecords(res.data.result);
    })
    .catch(err => console.log(err))
  }
  const reloadWindow = () => {
    setShow(false);
    setValidated(false);
    setValues({ 
      court_id: '',
      court_date: minDate, 
      start_time: timeFromInt(minTime),
      end_time: timeFromInt(minTime + 30 * 60),
      cus_phone: '',
      booking_method: 'At the counter',
      receptionist_id: '',
      cus_name: ''
    })
  }
  const SubmitAdd = (values) => {
    const {cus_name, ...params} = values;
    axios.post(main_http, params)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        console.log(msg);
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for primary key');
        else if (msg.includes('cus_reference')) {
          alert("Customer haven't been here before. Consider adding customer name?");
          document.getElementById("cus-name").classList.remove('visually-hidden');
          axios.post('http://localhost:8080/customer/customer', {
            phone: values.cus_phone,
            name: values.cus_name
          })
          .catch(err => console.log(err));
        }
        else if (msg.includes('rct_reference')) {
          alert("Receptionist ID not available");
        }
      }
      else reloadWindow();
    })
    .catch(err => console.log(err));
  }
  const SubmitEdit = (values) => {
    const prev = JSON.parse(sessionStorage.getItem('beforeEdit'));
    const params = `${prev.court_id}/${prev.court_date}/${prev.start_time}`;
    axios.put(main_http + params, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        console.log(msg);
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for primary key');
        else if (msg.includes('cus_reference')) {
          alert("Customer haven't been here before. Consider adding customer name?");
          document.getElementById("cus-name").classList.remove('visually-hidden');
          axios.post('http://localhost:8080/customer/customer', {
            phone: values.cus_phone,
            name: values.cus_name
          })
          .catch(err => console.log(err));
        }
        else if (msg.includes('rct_reference')) {
          alert("Receptionist ID not available");
        }
      }
      else {
        alert("Court reservation updated successfully");
        window.location.href="/court-manage";
      }
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
          <Navbar goBack={true} href="/court-manage/" />
        </div>
        <div>
        <h3>Court Reservation</h3>
        <Form id="find-court-form" className="d-flex align-items-end">
          <Form.Group className="">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date"
              min={minDate}
              max={maxDate}
              value={values.court_date}
              onChange={ (e) => {
                setValues({...values, court_date: e.target.value})
                if (e.target.value != minDate) {
                  setMinTime(min);
                }
                else {
                  setMinTime(currentTime)
                }
              }}
            />
          </Form.Group>
          <Form.Group className="ms-3">
            <Form.Label>Start</Form.Label>
            <TimePicker 
              start={timeFromInt(minTime)}
              end="21:30" 
              step={30}
              format={24}
              value={values.start_time}
              onChange={(time) => {
                const t = parseInt(time) + 30 * 60;
                setValues({...values, start_time: timeFromInt(parseInt(time)), end_time: timeFromInt(t)})
                setMinEndTime(t)
              }}
            />
          </Form.Group>
          <Form.Group className="ms-3">
            <Form.Label>End</Form.Label>
            <TimePicker 
              start={timeFromInt(minEndTime)} 
              end="22:00" 
              step={30}
              format={24}
              value={values.end_time}
              onChange={(time) => setValues({...values, end_time: timeFromInt(parseInt(time))})}
            />
          </Form.Group>
          <button className="btn btn-dark ms-3" type="submit"
            id="find-court-btn" onClick={findCourt}>Find</button>
        </Form>
        </div>
        <div className="table-scrollable-sm">
          <table className="table table-hover">
            <thead className="sticky-top bg-white">
              <tr>
                <th>Court ID</th>
                <th>Court type</th>
                <th>Court price</th>
                <th>Reserve</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((item, id) => {
                  return <tr key={id}>
                    <td>{item.court_id}</td>
                    <td>{item.court_type}</td>
                    <td>{item.court_price}</td>
                    <td>
                      <button className="btn" onClick={() => { 
                        setShow(true);
                        setValues({...values, court_id: item.court_id})
                      }}>
                        <i className='bx bx-plus-circle fs-5'></i>
                      </button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table> 
        </div>
        <div>
          <ModalForm
            edit={edit}
            table="Court Reservation"
            attributes={Object.keys(values)}
            labels={labels}
            constraints={constraints}
            feedback={feedback}
            show={show}
            setShow={setShow}
            validated={validated}
            setValidated={setValidated}
            values={values}
            setValues={setValues}
            pk={['court_id', 'court_date', 'start_time']}
            submitEdit={SubmitEdit}
            submitAdd={SubmitAdd}
          />
      </div>
      </div>
    </div>
  </div>
  )
}

export default CourtRental