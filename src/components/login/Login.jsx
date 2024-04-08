import React from 'react'
import './Login.css'

const Login = () => {
  return (
    
      <div className="wrapper">
    <form action="/dashboard">
      <h1>Login</h1>
      <div className="input_box">
        <input type={"text"} placeholder="Username" required/>
        <i className='bx bxs-user'></i>
      </div>
      <div className="input_box">
        <input type={"password"} placeholder="Password" required/>
        <i className='bx bxs-lock-alt' ></i>
      </div>
      <div className="remember_forgot">
        <label> <input type={"checkbox"}/>Remember me</label>
        <a href="#">Forgot password?</a>
      </div>
      <button type={"submit"} className="btn">Login</button>
      <div className="register_link">
        <p>Don't have account? <a href="#">Register</a></p>
      </div>
    </form>
  </div>
  
    
  )
}

export default Login
