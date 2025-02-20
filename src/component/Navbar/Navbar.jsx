import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartcontext } from "../../context/CartContext";
import imageOne from "../../assets/images/iconApp.svg";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthUser/AuthUser";

function Navbar() {
  //
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  // decode
  let payload = null;
  if (localStorage.tkn) {
    const parts = localStorage.tkn.split(".");
    payload = JSON.parse(atob(parts[1]));
  }

  // use context cartcontext to share cart info
  const { countProducts } = useContext(cartcontext);

  return (
    <nav className="navbar navbar-expand-md ">
      <div className="container align-items-start">
        <div className="d-md-flex">
          <Link className="navbar-brand fw-bold" to="/">
            <img src={imageOne} alt="Fresh Cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="fa-solid fa-bars fa-lg"></i>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none p-2 d-block fw-semibold"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none p-2 d-block fw-semibold"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none p-2 d-block fw-semibold"
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-decoration-none p-2 d-block fw-semibold"
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {localStorage.tkn ? (
          <div className="cartANDlike d-flex align-items-center gap-3">
            <Link to="/">
              <i className="fa-regular fa-heart fs-3 fw-semibold"></i>
              <span>0</span>
            </Link>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping fs-3 fw-semibold"></i>
              <span>{countProducts}</span>
            </Link>
            <div className="dropdown">
              <button
                className="text-white border-0 fs-5 fw-semibold rounded-5"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {payload?.name.substr(0, 1).toUpperCase()}
              </button>
              <ul
                style={{ transform: "translate(-80%,13%)" }}
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  className="px-2 mb-2 pb-1 fw-semibold"
                  style={{
                    color: "#0aad0a",
                    borderBottom: "2px solid #0aad0a",
                  }}
                >
                  {payload?.name}
                </li>
                <li
                  className="px-2 fw-bold"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem("tkn");
                    navigate("/");
                  }}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="log rounded-3">
            <Link to="/login" className="btn border-0 px-2">
              Sign In / Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
