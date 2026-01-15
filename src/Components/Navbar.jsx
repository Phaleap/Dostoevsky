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
              <span className="link default">ABOUT ME</span>
              <span className="link hover">ABOUT ME</span>
            </span>
          </li>
          <li className="nav-link">
            <span className="link-inner">
              <span className="link default">WORK WITH ME</span>
              <span className="link hover">WORK WITH ME</span>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
