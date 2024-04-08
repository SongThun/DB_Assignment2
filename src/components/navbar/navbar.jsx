import React from 'react'
import './navbar.css'

const navbar = () => {
  return (
    <div>
        <header className="header">
          <a href="" className="logo">CC02_N3</a>
          <nav className="navbar">
            <a href="/dashboard">Home</a>
            <a href="">Settings</a>
            <a href="">Account</a>
          </nav>
        </header>
    </div>
  )
}

export default navbar
