import React from 'react'
import Form from 'react-bootstrap/Form'

const DataTitle = ({title, addModal, href}) => {
  return (
    <div>
      <div className="d-flex align-items-baseline">
        <div className="fs-3 fw-semibold">{title}</div>
        { href && (
          <a className="btn fs-3" href={href}><i className='bx bx-plus-circle'></i></a>
        )}
        { !href &&
          <button className="btn fs-3" onClick={addModal}><i className='bx bx-plus-circle'></i></button>
        }
        
      </div>
    </div>
  )
}

export default DataTitle