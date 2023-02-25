import { NavLink, Outlet } from 'react-router-dom';
import Logo from "../asssets/Logo.png"

function Navbar(props) {
  return (
    <div className="sticky-nav">
      <nav>
      
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className="nav-links-a"
              
            >
              Home
            </NavLink>
          </li>

          <div className="split" />

          <li>
            <NavLink
              to="/about"
              className="nav-links-a"
              
            >
              About
            </NavLink>
          </li>

          <div className="split" />

          <li>
            <NavLink
              to="/carts"
              className="nav-links-a"
              
            >
              Cart
            </NavLink>
          </li>

          {props.loggedIn ? null : <div className="split" />}

          {props.loggedIn ? (
            <div className="split" />
          ) : (
            <li>
              {/* Only show this button if there is no user logged in */}
              <NavLink
                to="/login"
                className="nav-links-a"
                
              >
                Login
              </NavLink>
            </li>
          )}

          {props.loggedIn ? null : <div className="split" />}

          

          {props.loggedIn ? (
            <li>
              <NavLink
                onClick={() => props.logOut()}
                to="/"
                className="nav-links-a"
                
              >
                LogOut
              </NavLink>
            </li>
          ) : null}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
