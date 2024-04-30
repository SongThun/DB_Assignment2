import React,{useState} from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import Card from '../../components/Card.jsx';
import { Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import {timeFormInt, timeToInt} from 'time-number';
import DataTitle from '../../components/DataTitle.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import ModalForm from '../../components/ModalForm.jsx';
import axios from 'axios';
import moment from 'moment';
import Guide from '../../components/Guideline/Guide.jsx';

const Staff = ({edit}) => {
  axios.defaults.withCredentials=true;
  
  const start_id = ['RCT', 'COA', 'CLN', 'MNG'];
  const job_title = ['Receptionist','Coach','Cleaning Staff','Facilities Manager'];
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
      required: true
    },
    dob: {
      type: "date",
      required: true,
      max: moment(new Date()).format('YYYY-MM-DD')
    },
    job_title: {
      type: "select",
      select_options: job_title,
      defaultValue: job_title[0],
      required: true
    },
    address:{
      type: "text",
      required: true
    },
    name: {
      type: "text",
      required: true
    }
  }

  const constraintsJob = {
    cleaner_id: {},
    receptionist_id: {},
    wage: {}
  }

  const feedbackJob = {
    cleaner_id: "",
    receptionist_id: "",
    wage: ""
  }

  const [records,setRecords]=useState([]);
  // const [values,setValues] = useState([]);
  const [show,setShow] = useState([]);
  const [validated,setValidated] = useState([]);
  const [jobValue, setJobValue] = useState({
    cleaner_id: '',
    receptionist_id: '',
    wage: ''
  });
  const [job_type, setJobType] = useState("");
  const [validatedJob, setValidatedJob] = useState(false);
  const [showJob, setShowJob] = useState(false);

  const feedback = {
    staff_id: "ID must have 8 characters, first 3 characters must be uppercase letters.\nEx: RCT00001",
    ssn: "SSN must be a valid 12-digit social security number",
    email: "Please provide a valid email"
  }

  const reloadWindow=()=>{
    // setShow(false);
    // setValidated(false);
    // setValues({});
  }
  const reloadWage = () => {
    setShowJob(false);
    setValidatedJob(false);
    setJobValue({
      receptionist_id: '',
      cleaner_id: '',
      wage: ''
    });

  }
  const addWageReceptionist = (values) => {
    axios.post('http://localhost:8080/employee/receptionist', {
      receptionist_id: values.receptionist_id,
      wage: wage
    })
    .then(res => reloadWage())
    .catch(err => console.log(err));
  }
  const addWageCleaner = (values) => {
    axios.post('http://localhost:8080/employee/cleaning_staff', {
      cleaner_id: values.cleaner_id,
      wage: wage
    })
    .then(res => reloadWage())
    .catch(err => console.log(err));
  }
  const SubmitAdd = (values, reloadData) => {
    const job_title_index = job_title.indexOf(values.job_title);

    console.log(values.staff_id.substr(0,3));
    console.log(job_title_index);
    if (start_id[job_title_index] != values.staff_id.substr(0,3)) {
      alert("SID and Role don't match");
      return;
    }
    const job_table = ['receptionist', 'coach', 'cleaning_staff', 'facilities_manager'];
    console.log(job_table[job_title_index]);
    axios.post(main_http + job_table[job_title_index], values)
    .then(res => {
      if (res.data.err) {
        if (!res.data.err.sqlMessage) {
          return console.log('err',res.data.err)
        }
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
      else if (res.data.job_title_error) {
        if (values.job_title == 'Cleaning Staff' || values.job_title == 'Receptionist') {
          setJobType(values.job_title == 'Cleaning Staff' ? "cleaner_id" : "receptionist_id");
          alert('Please add wage for new staff');
          setJobValue({
            cleaner_id: values.staff_id,
            receptionist_id: values.staff_id,
            wage: ''
          });
          setShowJob(true);
        }
        console.log('dataasdf', res.data.result);
        reloadData(res.data.result, true);
        // localStorage.setItem('staff_id', JSON.stringify(values.staff_id));
        // window.location.href = '/form/' + values.job_title.replace(' ', '-').toLowerCase(); // Them form
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
  };
  const header=['SID','SSN','Full Name','Email','Address','DOB','Role']
  const labels=['SID','SSN','Full Name','Email','Address','DOB','Role']
  const sortlabels=['SID','SSN','Full Name','Email','Address','DOB','Role']

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
				
						<Sidebar active_item="Employee"/>
					

					<div className="col background1 container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href="/" goBack="true"/>
            </div>
            
            <div id="cards" className="container-fluid row gap-3">
              <Card href="/employee/shift" card_title="Receptionist's Shift"/>
              <Card href="/employee/shiftcleaning" card_title="Cleaner's Shift"/>
              <Guide/>
            </div>

						<div>
              <Table 
                table_size="sm"
                table="Staff"
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
          
          <div>
            <ModalForm
              table="Staff"
              attributes={[job_type, "wage"]}
              labels={[job_type == 'cleaner_id' ? "Cleaner ID" : "Receptionist ID", "Wage"]}
              constraints={constraintsJob}
              feedback={feedbackJob}
              show={showJob}
              setShow={setShowJob}
              validated={validatedJob}
              setValidated={setValidatedJob}
              values={jobValue}
              setValues={setJobValue}
              pk={[job_type]}
              submitEdit={() => {}}
              submitAdd={job_type == 'cleaner_id' ? addWageCleaner : addWageReceptionist}
              
            />
          </div>


        </div>
    </div>

  )
}

export default Staff