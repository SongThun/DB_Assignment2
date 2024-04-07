import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  axios.defaults.withCredentials = true;
  
  const validate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', {
      username: username,
      password: password
    }).then(res => {
      if (res.data.msg) {
        setStatus(res.data.msg)
        navigateTo('/login')
      }
      else {
        navigateTo('/court')
      }
    })
    .catch(err => console.log(err))
  }

  const navigateTo = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <form action="POST">
        <label htmlFor='username'>Username: </label>
        <input type='text' id='username' placeholder='Enter username'
        onChange={(e) => setUsername(e.target.value)}></input>
        <br></br>
      
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' placeholder='Enter password'
        onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>

        <button onClick={validate}>Login</button>
      </form>
      <div>{status}</div>
    </div>
  )
}

export default Login