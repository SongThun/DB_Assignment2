import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import FormOption from './FormOption'
import './FormCom.css'

const FormCom = () => {
  return(
    <div className="formcom template d-flex justify-content-center align-items-center vh-100 bg-opacity-75">
      <div className='form_container p-5 rounded bg-white border border-dark'>
          <form action="">
            <h3 className='text-center'>Fill out full of infomation</h3>
            <div className='mb-2'>
              <label htmlFor="text">Staff ID</label>
              <input type="text" className="form-control" placeholder='Enter Staff ID'/>
            </div>
            <div className='mb-2'>
            <label htmlFor="text">Wage</label>
            <input type="text" className="form-control" placeholder='Enter Wage'/>
            </div>
            <div className="d-grid">
              <button className='btn btn-primary'>Enter</button>
            </div>
          </form>
      </div>
    </div>
  ) 
};

export default FormCom