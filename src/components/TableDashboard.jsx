import React, { useState, useEffect } from 'react'
import DropdownFilter from './DropdownFilter.jsx';
import SortForm from './SortForm.jsx';
import axios from 'axios'
import ModalForm from './ModalForm.jsx';
import loginAlert from './loginAlert.js';
import DataTitle from './DataTitle.jsx';

const Tabledashboard = ({  table_size, table, modal_attributes, sortlabels,
                  labels, constraints, feedback, 
                  main_http, header,
                  handleEdit, handleDelete,
                  submitEdit, submitAdd,
                  crud, rental, editCondition
                  }) => {
  
  axios.defaults.withCredentials=true;

  const [attributes, setAttributes] = useState([]);
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [edit, setEdit] = useState(false);
  const [pk, setPk] = useState({});
  
  const [values, setValues] = useState();
  
  // FILTER
  const [distinct, setDistinct] = useState({});
  const [filters, setFilters] = useState({});
  const [sortby, setSortby] = useState({});

  const [noAllowEdit, setNoAllowEdit] = useState([]);

  const getData = async () => {
    
  };
  const setEditRecord = (data) => {
    if (editCondition) {
      setNoAllowEdit(() => {
        let noEditItem = [];
        data.forEach((record, i) => {
          if (!editCondition(record)) noEditItem.push(record);
        });
        return noEditItem;
      });
    }
  }

  useEffect(() => {
    axios.get(main_http)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        console.log(msg)
        if (msg.includes('staff.PRIMARY'))
          alert('Duplicate entry for Staff ID!');
        if (msg.includes('staff_jobtitle')) {
          alert('Invalid job title!');
        }
        if (msg.includes('staff.ssn')){
          alert('Duplicate entry for Staff SSN!');
        }
      }
      else {
        setRecords(res.data);
        setAttributes(Object.keys(res.data[0]));
      }
    })
    .catch(err => console.log(err));
  }, [])

  const defaultEdit = (record) => {
    setValues(record);
    setShow(true);
    setEdit(true);
    setPk(() => {
      let newPkVal = {};
      Object.keys(pk).forEach((key) => {
        newPkVal[key] = record[key];
      });
      return newPkVal;
    })
  }

  const defaultDelete = (record) => {
    let params = '';
    Object.keys(pk).forEach((key) => {
      params += `${record[key]}/`;
    })
    if (confirm(`Are you sure you want to delete this item?`)) {
      axios.delete(main_http + params)
      .then(res => {
        if (res.data.err) {
          console.log(res.data.err);
        }
        else {
          reloadData(res.data);
          
        }
      })
      .catch(err => console.log(err))
    }
  }

  const reloadData = (data, add) => {
    const index = data.findIndex((record)  =>{
      for (const key in pk) {
        if (record[key] != values[key]) return false;
      }
      return true;
    })
    if (index !== -1) {
      data[index].className="new-record";
      if (add)  {
        let targetObject = data.splice(index, 1)[0]; // Remove the object from the array
        data.unshift(targetObject); // Add the object to the beginning of the array
      }
    }
    setRecords(data);
    setShow(false);
    setValidated(false);
    setValues(() => {
      let initialAttr = {};
      attributes.forEach((key) => {
        initialAttr[key] = '';
      });
      return initialAttr;
    })
    setEditRecord(data);
  }

  const toggleFilter = (attribute, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[attribute].indexOf(value);
      if (index === -1) {
      updatedFilters[attribute] = [...updatedFilters[attribute], value];
      } else {
        if (updatedFilters[attribute].length == 1) updatedFilters[attribute] = []
        else updatedFilters[attribute].splice(index, 1);
      }
      console.log(distinct[attribute]);
      return updatedFilters;
  });
  };

  const selectAll = (attribute) => {
    setFilters(prevFilters => {
        return { ...prevFilters, [attribute]: distinct[attribute] };
    });
  };
  
  const clearAll = (attribute) => {
    setFilters(prevFilters => {
        return { ...prevFilters, [attribute]: [] };
    });
  };

  const onToggleSort = (attribute, desc, isSwitch) => {
    setSortby(prevSort => {
      let updateSort = {...prevSort};
      if (Object.keys(updateSort).includes(attribute)) {
        if (isSwitch) {
          updateSort[attribute] = desc;
        }
        else delete updateSort[attribute]
      }
      else {
        if (!isSwitch) updateSort[attribute] = false;
      }
      return updateSort;
    });
  }

  const handleFilterSort = (e) => {
    e.preventDefault();
    axios.post(main_http + "filter-sort", {
      filters: filters,
      sort: sortby
    })
    .then(res => {
      if (res.data.err) setRecords([]);
      else setRecords(res.data);
    })
    .catch(err => console.log(err));
  }


  return (
    <div>
     
      <div className="row">
        <div className={`col-12 table-scrollable-${table_size}`}>
          <table className=" table table-responsive table-bordered border-dark table-hover text-center text-capitalize">
            <thead className="sticky-top bg-white border-bottom">
              <tr className="table-drak table-active text-uppercase text-white">
                {attributes.map((attribute, index) => (
                  <th key={index}>
                    {attribute}
                    {/* <DropdownFilter
                      attribute={header ? header[index]: attribute}
                      values={distinct[attribute]}
                      selectedValues={filters[attribute]}
                      onSelectAll={() => selectAll(attribute)}
                      onClearAll={() => clearAll(attribute)}
                      onToggle={(value) => toggleFilter(attribute, value)}
                      handleFilter={handleFilterSort}
                    /> */}
                  </th>
                ))}
                
              </tr>
            </thead>
            <tbody>
              { 
                records.map((record, rid) => {
                  return <tr key={rid} className={record.className ? record.className : ""}>
                      {attributes.map((attr, aid) => {
                          return <td key={aid}>{record[attr]}</td>
                      })}

                      
                    </tr>
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
        
  )
}

export default Tabledashboard