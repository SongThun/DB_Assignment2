import React from 'react'
import Form from 'react-bootstrap/Form'

const FormOption = ({options, onChange, value}) => {
  const {type, select_options, ...rest} = options ? options : {type: "text"};
  if (type == 'select') {
    return (
      <Form.Select
        onChange={onChange} {...rest}>
        {
          select_options.map((option, id) => {
            return id == 0 ? <option key={id} value={option} selected>{option}</option>
                            : <option key={id} value={option}>{option}</option>
          })
        }
      </Form.Select>
    )
  }
  return (
    <Form.Control 
      type={type ? type : "text"} 
      value={value} 
      onChange={onChange} {...rest} />
  )
}

export default FormOption;