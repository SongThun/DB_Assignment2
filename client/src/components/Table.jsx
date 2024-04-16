import React, { useState, useEffect } from 'react'
import DropdownFilter from './DropdownFilter.jsx';
import SortForm from './SortForm.jsx';
import axios from 'axios'
import ModalForm from './ModalForm.jsx';
import loginAlert from './loginAlert.js';
import DataTitle from './DataTitle.jsx';

const Table = ({  table_size, table,
                  constraints, feedback, 
                  main_http, 
                  handleEdit, handleDelete,
                  submitEdit, submitAdd,
                  crud, rental, data}) => {
  
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
  const [sortby, setSortby] = useState({})

  // if (data) {
  //   setRecords(data.result);
  //   setAttributes(data.attributes);
  //   setDistinct(data.distinct);
  //   setPk(data.primaryKeys);
  // }

  useEffect(() => {
    loginAlert();
    if (rental && !crud) return; 
    axios.get(main_http)
      .then(res => {
        if (res.data.err) console.log(res.data.err);
        else {
          setRecords(res.data.result);
          setDistinct(res.data.distinct);
          setFilters(JSON.parse(JSON.stringify(res.data.distinct)));
          setAttributes(res.data.attributes);
          setPk(() => {
            let initialPk = {};
            res.data.primaryKeys.forEach((key) => {
              initialPk[key] = '';
            });
            return initialPk;
          });
          setValues(() => {
            let initialAttr = {};
            attributes.forEach((key) => {
              initialAttr[key] = '';
            });
            return initialAttr;
          });
        }
      })
      .catch(err => console.log(err));
  }, []);

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

  const reloadData = (data) => {
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
      { !rental && <DataTitle title={table} addModal={() => setShow(true)}/>}
      <div className="row">
        <div className={`col-8 table-scrollable-${table_size}`}>
          <table className=" table table-hover">
            <thead className="sticky-top bg-white border-bottom">
              <tr>
                {attributes.map((attribute, index) => (
                  <th key={index}>
                    <DropdownFilter
                      attribute={attribute}
                      values={distinct[attribute]}
                      selectedValues={filters[attribute]}
                      onSelectAll={() => selectAll(attribute)}
                      onClearAll={() => clearAll(attribute)}
                      onToggle={(value) => toggleFilter(attribute, value)}
                      handleFilter={handleFilterSort}
                    />
                  </th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { 
                records.map((record, rid) => {
                  return <tr key={rid}>
                      {attributes.map((attr, aid) => {
                          return <td key={aid}>{record[attr]}</td>
                      })}
                      {
                        crud && 
                        <td className="action-field">
                            <button className="btn" onClick={() => { 
                              if (handleEdit) handleEdit(record);
                              else defaultEdit(record);
                            }}>
                              <i className='bx bxs-edit-alt'></i>
                            </button>
                            <button className="btn" 
                              onClick={() => {
                                if (handleDelete) handleDelete(record);
                                else defaultDelete(record);
                            }}>
                              <i className='bx bx-x'></i>
                            </button>
                        </td> 
                      }
                      {
                        !crud &&
                        <td className="add-field">
                          <button className="btn">
                            <i className='bx bx-plus-circle fs-5'></i>
                          </button>
                        </td>
                      }
                    </tr>
                  })
              }
            </tbody>
          </table>
        </div>
        <div className="col ms-4">
          <SortForm 
            attributes={records.length ? Object.keys(records[0]) : []}
            selectedValues={sortby}
            onToggle={onToggleSort}
            handleSort={handleFilterSort}/>
        </div>
      </div>
      <ModalForm
        edit={edit}
        table={table}
        attributes={attributes}
        constraints={constraints}
        feedback={feedback}
        show={show}
        setShow={setShow}
        validated={validated}
        setValidated={setValidated}
        values={values}
        setValues={setValues}
        pk={pk}
        submitEdit={submitEdit}
        submitAdd={submitAdd}
        reloadData={reloadData}/>
    </div>
        
  )
}

export default Table