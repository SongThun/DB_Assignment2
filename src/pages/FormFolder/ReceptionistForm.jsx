import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import FormOption from '../../components/FormOption'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import FormCom from '../../components/FormCom'

const ReceptionistForm = () => {
  return (
    <div className="row">
              <Sidebar/>
            <div className="col background1 container-fluid">
                <div className="sticky-top border-bottom mb-4 container-fluid"><Navbar/></div>
                <FormCom/>
            </div>
            
    </div>
  )
}

export default ReceptionistForm
