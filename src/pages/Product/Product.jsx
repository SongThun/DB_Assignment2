import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx';
import '../../components/Table.css'
import Table from '../../components/Table.jsx';
import axios from 'axios'

const Product = () => {
  axios.defaults.withCredentials=true;
  
  const main_http = 'http://localhost:8080/product-manage/product/';
  const constraints = {
    product_name: {
      type: "text",
      required: true,
    },
    product_price: {
      pattern: "[0-9]*\.?[0-9]*"
    },
    in_stock: {
      type: "number",
      min: 0
    }
  }

  const feedback = {
    product_name: "Please provide a name for this product",
    product_price: "Must be a decimal value (.00)"
  }

  const SubmitAdd = (values, reloadData) => {
    axios.post(main_http, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for court_id (primary key)');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  }
      
  const SubmitEdit = (pk, values, reloadData) => {
    let params = '';
    for (const key in pk) {
      params += `${pk[key]}/`;
    }
    axios.put(main_http + params, values)
    .then(res => {
      if (res.data.err) {
        const msg = res.data.err.sqlMessage;
        if (msg.includes('Duplicate entry'))
          alert('Duplicate entry for primary key');
      }
      else reloadData(res.data)
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container-fluid min-vh-100">
        <div className="row">
					<div className="col-2 bg-dark vh-100 sticky-start">
						<Sidebar active_item="Product"/> 
					</div>

					<div className="col container-fluid">
						<div className="sticky-top border-bottom mb-4 container-fluid">
              <Navbar href="/court" goBack="true"/>
            </div>

						<div>
              <Table 
                table_size="lg"
                table="Product"
                constraints={constraints}
                feedback={feedback}
                main_http={main_http}
                submitEdit={SubmitEdit}
                submitAdd={SubmitAdd}
                crud="true"
              />
						</div>
					</div>
        </div>
    </div>

  )
}

export default Product