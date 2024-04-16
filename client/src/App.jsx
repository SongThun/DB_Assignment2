import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Court from './pages/Court/Court.jsx';
import CourtRentalCU from './pages/Court/CourtRentalCU.jsx';
import CourtsManage from './pages/Court/CourtsManage.jsx';
import Staff from './pages/Employee/Staff.jsx';
import Program from './pages/Program/Program.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Product/Product.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/court-manage' element={<Court/>}/>
            <Route path='/court-manage/add' element={<CourtRentalCU edit="false"/>}/>
            <Route path='/court-manage/edit' element={<CourtRentalCU edit="true"/>}/>
            <Route path='/court-manage/court' element={<CourtsManage/>}/>
            <Route path='/employee' element={<Staff/>}/>
            <Route path='/training-program' element={<Program/>}/>
            <Route path="/product-manage" element={<Product/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
