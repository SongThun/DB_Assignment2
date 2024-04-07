import React from 'react'
import axios from 'axios'


const navbar = ({username}) => {
    axios.defaults.withCredentials=true;

    const logout = () => {
        axios.get('http://localhost:8080/logout')
        .then(res => {
            if (res.data.status === "success") {
                location.href='/';
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <h3>Hello, {username}</h3>
        <button onClick={logout}>logout</button>
    </div>
  )
}

export default navbar