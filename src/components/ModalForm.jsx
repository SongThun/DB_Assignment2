import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import FormOption from './FormOption'

const ModalForm = ({edit, table, labels,
                attributes, constraints, feedback,
                show, setShow,
                validated, setValidated, 
                values, setValues, pk,
                submitEdit, submitAdd, reloadData}) => {
  //const labelss =[]
  const cutIndex = Math.ceil(attributes.length/2);
  return (
    <Modal show={show} backdrop="static">
      <Modal.Header closeButton onHide={() => {
       setShow(false);
       setValidated(false);
       setValues(() => {
        let initialAttr = {};
        attributes.forEach((key) => {
          initialAttr[key] = '';
        });
        return initialAttr;
       })
      }}>
        <Modal.Title>{edit ? "Edit" : "Add"} {table}</Modal.Title>
      </Modal.Header>
      <Form id='modal-form' className="" noValidate validated={validated}>  
        <Modal.Body>
          <div className="row">
            <div className="col">
              {
                attributes.slice(0, cutIndex).map((attr, aid) => {
                  const className= constraints[attr] ? constraints[attr].pClassName : "";
                  const id= constraints[attr] ? constraints[attr].pid : "";
                  return <Form.Group key={aid} md="3" id={id} className={`mt-3 ${className}`}>
                    <Form.Label>{labels[aid]}</Form.Label>
                    <FormOption 
                      value={values[attr]}
                      options={constraints[attr]}
                      onChange={(e) => setValues({...values, [attr]: e.target.value})}/>
                    <Form.Control.Feedback type="invalid">
                      {feedback[attr]}
                    </Form.Control.Feedback>
                  </Form.Group>
                })
              }
            </div>
            <div className="col">
              {
                attributes.slice(cutIndex, attributes.length).map((attr, aid) => {
                  const className= constraints[attr] ? constraints[attr].pClassName : "";
                  const id= constraints[attr] ? constraints[attr].pid : "";
                  return <Form.Group key={aid} md="3" id={id} className={`mt-3 ${className}`}>
                    <Form.Label>{labels[aid + cutIndex]}</Form.Label>
                    <FormOption 
                      value={values[attr]}
                      options={constraints[attr]}
                      onChange={(e) => setValues({...values, [attr]: e.target.value})}/>
                    <Form.Control.Feedback type="invalid">
                      {feedback[attr]}
                    </Form.Control.Feedback>
                  </Form.Group>
                })
              }
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-dark"
            onClick={(e) => {
              const form = document.getElementById('modal-form');
              if (form.checkValidity() === false) {
                e.preventDefault();
                setValidated(true);
              }
              else {
                e.preventDefault();
                if (reloadData) {
                  if (edit) submitEdit(pk, values, reloadData);
                  else submitAdd(values, reloadData);
                }
                else {
                  if (edit) submitEdit(values);
                  else submitAdd(values);
              }}
            }}>
            Submit
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ModalForm;