import React from 'react'
import {Modal, Form} from 'react-bootstrap'
import FormOption from './FormOption'

const ModalForm = ({edit, table,
                attributes, constraints, feedback,
                show, setShow,
                validated, setValidated, 
                values, setValues, pk,
                submitEdit, submitAdd, reloadData}) => {

  const cutIndex = Math.ceil(attributes.length/2);
  return (
    <Modal show={show} backdrop="static">
      <Modal.Header closeButton onHide={() => {
       setShow(false);
       setValidated(false);
      }}>
        <Modal.Title>{edit ? "Edit" : "Add"} {table}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row" validated={validated}>
          <div className="col">
            {
              attributes.slice(0, cutIndex).map((attr, aid) => {
                return <Form.Group key={aid} md="3" className="mt-3">
                  <Form.Label>{attr}</Form.Label>
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
                return <Form.Group key={aid} md="3" className="mt-3">
                  <Form.Label>{attr}</Form.Label>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-dark"
          onClick={(e) => {
            console.log(values);
            if (e.target.checkValidity() === false) {
              e.preventDefault();
            }
            setValidated(true);
            if (edit) submitEdit(pk, values, reloadData)
            else submitAdd(values, reloadData);
          }}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm;