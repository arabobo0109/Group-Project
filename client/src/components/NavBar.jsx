import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ user, setUser, isLogged, setIsLogged, cart, setCart }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
      .then(res => {
        console.log("Yes current user", res.data);
        setIsLogged(true);
        setUser(res.data);
      })
      .catch(err => {
        console.log("current user error: " + err);
        setIsLogged(false);
      });
  }, []); // Empty dependency array to execute only once when component mounts


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
        setCart([]); // Reset the cart to an empty array
        localStorage.removeItem('cart'); // Clear the cart data from local storage
        navigate('/');
      })
      .catch(err => console.log("logout error: " + err));
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
      <button className="navbar-toggler bg-light" type="button" onClick={handleToggle}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse px-3 ${navbarOpen ? "show" : ""}`} id="navbarTogglerDemo02">
        <ul className="navbar-nav mx-auto text-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              <h3>Great Gear Gallery</h3>
            </Link>
          </li>

          <div className='d-flex align-items-center mx-4'>
            <li className="nav-item">
            <Link className="nav-link text-white" to="/cart">
            Cart {totalItemsInCart > 0 ? <button className='spinner-border  text-danger'>{totalItemsInCart}</button>  : ''}
            </Link>

            </li>

            {isLogged ? (
              <li className="nav-item">
                <a href="/" className="nav-link text-white" onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Login</Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
