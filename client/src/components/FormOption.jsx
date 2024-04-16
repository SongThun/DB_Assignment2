import React from 'react'
import Form from 'react-bootstrap/Form'

const FormOption = ({options, onChange, value}) => {
  const {type, ...rest} = options ? options : {type: "text"};
  return (
    <Form.Control 
      type={type ? type : "text"} 
      value={value} 
      onChange={onChange} {...rest} />
  )
}

export default FormOption;