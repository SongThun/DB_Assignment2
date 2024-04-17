import React, {useState} from 'react';
import { Dropdown, DropdownDivider, Form } from 'react-bootstrap';

const DropdownFilter = ({ attribute, values, selectedValues, onSelectAll, onClearAll, onToggle, handleFilter}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="white" >
        {attribute}
      </Dropdown.Toggle>
      <Dropdown.Menu 
        style={{  minWidth: '250px', 
                  maxHeight: '200px', 
                  padding: "0px",
                  overflowY: 'auto' , 
                  fontWeight: 'normal',
                  fontSize: "15px"}}>
        <Form>
          <div className="d-flex justify-content-end sticky-top border-bottom bg-white">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="m-2"
            />
            <button className="btn fw-semibold" onClick={handleFilter}>Filter</button>
          </div>
          <div style={{fontWeight: 'semibold'}}>
            <Form.Check
              className="ms-2 me-2"
              type="checkbox"
              label="Select All"
              checked={selectedValues.length === values.length}
              onChange={onSelectAll}
            />
            <Form.Check
              type="checkbox"
              className="ms-2 me-2"
              label="Clear All"
              checked={selectedValues.length === 0}
              onChange={onClearAll}
            />
          </div>
          
          {values
            .filter(value => {
              if (typeof value === 'string') {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
              }
              return false;
            })
            .map((value, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              className="ms-2 me-2"
              label={value}
              checked={selectedValues.includes(value)}
              onChange={() => onToggle(value)}
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownFilter;
