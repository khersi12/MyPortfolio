
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  // Subscribe to route changes so the login state below is re-read after navigation.
  useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          <span className="logo-shape">Portfolio</span>
          <span>My Portfolio</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={getNavClass}>Home</NavLink>
          <NavLink to="/about" className={getNavClass}>About</NavLink>
          <NavLink to="/education" className={getNavClass}>Education</NavLink>
          <NavLink to="/projects" className={getNavClass}>Projects</NavLink>
          <NavLink to="/services" className={getNavClass}>Services</NavLink>
          <NavLink to="/contact" className={getNavClass}>Contact</NavLink>

          {isLoggedIn ? (
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={getNavClass}>Login</NavLink>
              <NavLink to="/register" className={getNavClass}>Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
