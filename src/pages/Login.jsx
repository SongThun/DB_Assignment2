import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const validate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', values)
    .then(res => {
      if (res.data.valid) {
        sessionStorage.setItem('username', res.data.username);
        navigate('/');
      }
      else {
        setMsg(res.data.msg)
        document.getElementById("error-msg").classList.remove('visually-hidden');
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="background d-flex flex-column align-items-center">
      <div className="wrapper-login p-3 rounded">
        <form className="d-flex flex-column align-items-center">
          <h2 className="mb-2">Login</h2>
          
          <div id="error-msg" className="visually-hidden text-danger d-flex align-items-center mb-2">
              <i className='bx bx-error-circle me-2'></i>
              <span>{msg}</span>
          </div>

          <div className="d-flex align-items-center mb-2 w-100">
            <input type="text" placeholder="Username" className="form-control" required onChange={(e) => setValues({...values, username: e.target.value})}/>
            <i className='ms-1 fs-6 bx bxs-user'></i>
          </div>

          <div className="d-flex align-items-center mb-2 w-100">
            <input type="password" placeholder="Password" className="form-control" required onChange={(e) => setValues({...values, password: e.target.value})}/>
            <i className='ms-1 fs-6 bx bxs-lock-alt' ></i>
          </div>

          <button type="submit" className="btn btn-dark w-100" onClick={validate}>Login</button>
        </form>
      </div>
      
    </div>
  )
}

export default Login