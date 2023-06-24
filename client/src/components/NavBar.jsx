// In your NavBar component
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ user, setUser,isLogged, setIsLogged }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setIsLogged(true)
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: " + err)
                // setUser({})
                // setIsLogged(false)
        });
    }, [isLogged]);
  
    const handleToggle = () => {
      setNavbarOpen(!navbarOpen);
    };
  
    const handleLogout = (e) => {
        e.preventDefault();
        axios
          .get('http://localhost:8000/api/logout', { withCredentials: true })
          .then(res => {
            setUser(null);
            setIsLogged(false);
            navigate('/');
            // window.location.href = '/';
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
            {/* Common Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/"> <h3> Great Gear Gallery </h3> </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">Cart</Link>
            </li>
  
            {/* Conditionally rendered based on user login state */}
            {isLogged ? (
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  };
  

export default NavBar;
