import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'

const SortForm = ({attributes, selectedValues, handleSort, onToggle, onToggleSwitch}) => {
  return (
    <Form className="">
      <h4>Sort by</h4>
      {
        attributes.map((attr, id) => {
          return (
            <Form.Group key={id} md="3" className="row mt-3">
              <Form.Check 
                className="col" 
                type="checkbox" 
                label={attr} 
                checked={Object.keys(selectedValues).includes(attr)}
                onChange={() => onToggle(attr, selectedValues[attr], false)}
                inline/>
              <Form.Check 
                className="col"
                type="switch" 
                label={selectedValues[attr] ? "DESC" : "ASC"} 
                checked={selectedValues[attr] === true}
                onChange={() => onToggle(attr, !selectedValues[attr], true)}
                inline/>
            </Form.Group>
          )
        })
      }
      <button className="btn btn-dark mt-3" onClick={handleSort} >Sort</button>
    </Form>
  )
}

export default SortForm