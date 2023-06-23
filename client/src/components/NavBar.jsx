import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios';

const NavBar = ({ user, setUser }) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log("current user error: " + err)
                setUser({})
        });
    }, []);


    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    }

    const closeMenu = () => {
        setNavbarOpen(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("attempting to logout");
        axios
            .get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                setUser(null);
                console.log("successful logout")
                window.location.href = '/'
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
        <h3 className="navbar-brand">{(user && user.first) ? `Hi ${user.first},` : ""}</h3>
        {(
          location.pathname === '/createopenmat' || 
          location.pathname === '/bjjfaq' ||
          location.pathname.startsWith('/editopenmat') ||
          location.pathname.startsWith('/viewopenmat')
        ) ? (
          <>
            <li className="nav-item active">
              <Link to="/searchopenmats" className="nav-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (location.pathname === '/searchopenmats') ? (
          <>
            <li className="nav-item">
              <Link to="/bjjfaq" className="px-4 nav-link" onClick={closeMenu}>BJJ FAQ</Link>
            </li>
            <li className="nav-item">
              <Link to="/createopenmat" className="nav-link" onClick={closeMenu}>Create Open Mat</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" onClick={handleLogout} className="px-4 nav-link" onChange={closeMenu}>Logout</Link>
            </li>
          </>
        ) : (user && user.first) ? (
          <>
            <li className="nav-item">
              <Link to="/createopenmat" className="nav-link" onClick={closeMenu}>Create Open Mat</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" onClick={handleLogout} className="nav-link" onChange={closeMenu}>Logout</Link>
            </li>
          </>
        ) : (
          // If not logged in, show Login and Register options
          <>
            <h3 className='mx-4 spinner-grow-sm text-primary' > <Link to="/" className="nav-link">Great Gear Gallery</Link> </h3>
            <li className="nav-item">
              <Link to="/checkout" className="nav-link" onClick={closeMenu}>Checkout</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
    );
}

export default NavBar;
