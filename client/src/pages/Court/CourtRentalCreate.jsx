import React , {useState, useEffect}from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import moment from 'moment'
import TimePicker from 'react-bootstrap-time-picker';
import {timeFromInt} from 'time-number';
import '../../components/Table.css'
import loginAlert from '../../components/loginAlert.js';

const CourtRentalCreate = ({edit}) => {
  axios.defaults.withCredentials=true;

  const [courtsAvail, setCourtsAvail] = useState([]);
  const [show, setShow] = useState("");
  const [nameShow, setNameShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [courtid, setCourtId] = useState();
  const [nextTime, setNextTime] = useState("07:30");
  const [defaultTime, setDefaultTime] = useState({
    minDate: '',
    maxDate: '',
    minTime: '',
  });
  const [cusName, setCusName] = useState('');
  const [values, setValues] = useState({
    court_id: '',
    court_date: minDate.clone().format('YYYY-MM-DD'),
    start_time: minTime,
    end_time: nextTime,
    cus_phone: '',
    booking_method: 'At the counter',
    receptionist_id: '',
  });

  
  useEffect(() => {
    loginAlert();
    const now = new Date();
    let minDate, maxDate, minTime;

    if (now.getHours() < 7) {
        minDate=moment(now);
        maxDate=minDate.clone().add(7, 'days');
        minTime="07:00";
    }
    else if (now.getHours() > 21 || (now.getHours() == 21 && now.getMinutes() > 30)) {
        minDate=moment(now).add(1, 'days');
        maxDate=minDate.clone().add(7, 'days');
        minTime="07:00";
    }
    else {
        minDate=moment(now);
        maxDate=minDate.clone().add(7, 'days');
        minTime=moment(now).add(30 - now.getMinutes % 30, 'minutes').format('HH:mm');
    }
    setDefaultTime({
      minDate: minDate,
      maxDate: maxDate,
      minTime: minTime,
    })
    const info = edit ? JSON.parse(localStorage.getItem('prevRent')) : null;

    if (edit) {

    }
  }, [])

  const findCourt = (e) => {
    e.preventDefault();
    if (edit) {
      const values = {
        new: values,
        prev: info
      }
      axios.post('http://localhost:8080/court/available/edit')
      .then(res => {
        setCourtsAvail(res.data[0]);
      })
      .catch(err => console.log(err));
    }
    else {axios.post('http://localhost:8080/court/available', values)
      .then(res => {
        setCourtsAvail(res.data[0]);
      })
      .catch(err => console.log(err));
    }
  }


  const addCourtRental = (e) => {
    if (e.target.checkValidity() === false) {
        e.preventDefault();
        setValidated(true);
    }
    axios.post('http://localhost:8080/court/book/' + courtid, values)
    .then(res => {
      if (res.data.err) {
        setNameShow(false);
        const sqlmsg = res.data.err.sqlMessage;
        if (sqlmsg.includes('rct_reference')) {
          alert("Receptionist ID doesn't exist")
          setValidated(false);
        }
        if (sqlmsg.includes('cus_reference')) {
          setNameShow(true);
          setValidated(false);
          values.cus_name = cusName;
        }
      }
      else {
        setShow(false);
        setCusName('');
        setNameShow(false);
        delete values.cus_name;
        alert("Court Reservation added successfully");
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
          <div className="sticky-top border-bottom mb-4 container-fluid"><Navbar goBack="true" href="/court"/></div>
          <h3 className="m-2">Court Reservation</h3>
            
          <div className="row">
            <div className="col-3">
              <div id="rental-form" className="container-fluid">
                <form className="form">
                  <Form.Group  md="3" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date"
                        value={values.court_date}
                        min={minDate.format('YYYY-MM-DD')}
                        max={maxDate.format('YYYY-MM-DD')}
                        onChange={(e) => setValues({...values, court_date: e.target.value})}
                      />
                    
                    <Form.Control.Feedback type="invalid">{}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group  md="3" className="mt-3">
                    <Form.Label>Start time</Form.Label>
                    <TimePicker
                      value={values.start_time}
                      start={minTime}
                      end="21:30"
                      step={30}
                      format={24}
                      onChange={(time) => {
                          const t =timeFromInt(parseInt(time) + 30 * 60);
                          setNextTime(t);
                          setValues({...values, start_time: timeFromInt(parseInt(time)), end: t});
                      }}
                    />
                    <Form.Control.Feedback type="invalid">{}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group  md="3" className="mt-3">
                    <Form.Label>End time</Form.Label>
                    <TimePicker
                        value={values.end_time}
                        start={nextTime}
                        end="22:00"
                        step={30}
                        format={24}
                        onChange={(time) => {
                            setValues({...values, end_time: timeFromInt(parseInt(time))})
                        }}
                    />
                    <Form.Control.Feedback type="invalid">{}
                    </Form.Control.Feedback>
                  </Form.Group>
                        <button type="submit" className="mt-3 btn btn-dark" onClick={findCourt}>Find</button>
                </form>
              </div>
            </div>
              <div className="col table-scrollable-md">
                  <table className="table table-hover table-reponsive-sm">
                      <thead className="sticky-top bg-white">
                          <tr>
                              <th>Court ID</th>
                              <th>Court type</th>
                              <th>Price</th>
                              <th>Book</th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                          courtsAvail.map((court, id) => {
                            return <tr key={id}>
                              <td>{court.court_id}</td>
                              <td>{court.court_type}</td>
                              <td>{court.court_price}</td>
                              <td>
                                <button className="btn" onClick={() => {
                                    setShow(true);
                                    setCourtId(court.court_id); 
                                }}>
                                    <i className='bx bx-plus-circle fs-4'></i>
                                </button>
                              </td>
                            </tr>
                          })
                        }
                      </tbody>
                  </table>
                </div>
            </div>
            

            {/* Modal area */}

            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header closeButton onHide={()=> setShow(false)}>
                    <Modal.Title>Create reservation - Court {courtid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row" validated={validated}>
                        <div className="col-6">
                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required minLength={10} maxLength={10} pattern="[0-9]{10}"
                                    value={values.cus_phone}
                                    type="text" onChange={(e) => setValues({...values, cus_phone: e.target.value})}/>
                                <Form.Control.Feedback type="invalid">
                                    {!/^[0-9]{10}$/.test(values.phone) ? "Input contains letter(s)" : "Please provide valid 10-digit phone number" }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="cus-name" md="3" className="mt-3 visually-hidden">
                                <Form.Label></Form.Label>
                                <span>You haven't been here before, consider providing your name?</span>
                                <Form.Control 
                                    type="text" 
                                    onChange={(e) => setValues({...values, cus_name: e.target.value})}/>
                            </Form.Group>

                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>Method</Form.Label>
                                <Form.Select 
                                  value={values.booking_method}
                                  onChange={(e) => setValues({...values, booking_method: e.target.value})}>
                                    <option value="At the counter">At the counter</option>
                                    <option value="Online">Online</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>Receptionist ID</Form.Label>
                                <Form.Control required minLength={8} maxLength={8} pattern="RCT[0-9]{5}"
                                    value={values.receptionist_id}
                                    type="text" onChange={(e) => setValues({...values, receptionist_id: e.target.value})}/>
                                <Form.Control.Feedback type="invalid">
                                    { values.receptionist_id.length !== 8 ? "Receptionist ID must have 8 characters" : "Invalid ID"}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                nameShow && (
                                    <Form.Group md="3" className="mt-3">
                                        <Form.Label>Customer haven't been here before, consider providing name?</Form.Label>
                                        <Form.Control type="text" placeholder="Customer name" 
                                            onChange={(e) => setCusName(e.target.value)}/>
                                    </Form.Group>
                                )
                            }
                        </div>
                        <div className="col">
                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="text" disabled readOnly value={values.date}/>
                            </Form.Group>
                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>Start</Form.Label>
                                <Form.Control type="text" disabled readOnly value={values.start}/>
                            </Form.Group>
                            <Form.Group  md="3" className="mt-3">
                                <Form.Label>End</Form.Label>
                                <Form.Control type="text" disabled readOnly value={values.end}/>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit"className="btn btn-dark" onClick={addCourtRental}>Create</button>
                </Modal.Footer>
            </Modal>
            
        </div>
      </div>
    </div>
  )
}


export default CourtRentalCreate