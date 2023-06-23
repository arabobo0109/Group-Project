// In your NavBar component
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ user, setUser }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(res => {
        setUser(null);
        window.location.href = '/';
      })
      .catch(err => console.log("logout error: " + err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" onClick={handleToggle}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`} id="navbarTogglerDemo02">
        <ul className="navbar-nav mx-auto text-center">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Great Gear Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/">Great Gear Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Cart</Link>
              </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
