import React from 'react'
import '../Components/Navbar.css'

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          DeepWork
        </div>
        <ul>
          <li className="nav-link">
            <span className="link-inner">
              <span className="link default">ABOUT US</span>
              <span className="link hover">ABOUT US</span>
            </span>
          </li>
          <li className="nav-link">
            <span className="link-inner">
              <span className="link default">WORK WITH US</span>
              <span className="link hover">WORK WITH US</span>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
