import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx'

const Court = () => {
  const [court, setCourt] = useState([]);
  const [username, setUsername] = useState("")
  const navigateTo = useNavigate();

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.get("http://localhost:8080/court")
    .then(res => {
      if (res.data.valid) {
        setUsername(res.data.username)
        setCourt(res.data.result)
      }
      else {
        navigateTo('/login')
      }
    })
    .catch(err => console.log(err));
  }, [])
  return (
    <div>
      <h1>Court</h1>
      <Navbar username={username}/>
      <table>
        <thead>
          <tr>
            <th>CourtId</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {
            court.map((court,id) => {
              return <tr key={id}>
                <td>{court.courtid}</td>
                <td>{court.Type}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Court