import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function Navbar(props) {
  let navigate = useNavigate();

  let onLogOutHandler = async () => {
    let logout = await fetch("/logout");
    let status = await logout.json();
    console.log("Log out from Navbar status", status.status);
    window.location.reload(true);
  };
  if (props.login) {
    //what the navbar should look like when user IS logged in
    return (
      <nav
        className="navbar navbar-expand-md navbar-light bg-light sticky-top"
        aria-label={"navbar"}
      >
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li>
              <img
                src={logo}
                className="nav-item, nav_logo"
                alt="Service Share Logo"
              />
            </li>
            <li className="nav-item">
              <button
                  type="button"
                  // onClick={onClickOfferHelp}
                  className="stands-out-button"
              >
                <a className="nav-link active text-light" aria-current="page" href="./">
                  <h3>Home</h3>
                </a>
              </button>
            </li>
            <li>
                <button
                    type="button"
                    className="stands-out-button"
                >
                <a
                    className="nav-link active text-light"
                    aria-current="page"
                    href="./offerHelp"
                >
                  <h3>Help Offers</h3>
                    </a>
            </button>
              </li>
              <li>
            <button
                type="button"
                // onClick={onClickSeekHelp}
                className="stands-out-button"
            >
                <a
                    className="nav-link active text-light"
                    aria-current="page"
                    href="./seekHelp"
                >
                  <h3>Help Requests</h3>
                </a>
            </button>
            </li>
            <li className="nav-item">
              <button
                  type="button"
                  className="stands-out-button"
              >
                <a className="nav-link active text-light" aria-current="page" href="./post">
                  <h3>Post</h3>
                </a>
              </button>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <button
                  className="login_button"
                  onClick={onLogOutHandler}
              >
                <h3>Log Out</h3>
              </button>

            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    //what the navbar should look like when user IS NOT logged in
    return (
      <nav
        className="navbar navbar-expand-md navbar-light bg-light sticky-top"
        aria-label={"navbar"}
      >
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li>
              <img
                src={logo}
                className="nav-item, nav_logo"
                alt="Service Share Logo"
              />
            </li>

            <li className="nav-item">

              <button
                  type="button"
                  // onClick={onClickOfferHelp}
                  className="stands-out-button"
              >
                <a className="nav-link active  text-light" aria-current="page" href="./">
                  <h3>Home</h3>
                </a>
              </button>
            </li>
            <li>
              <span >
                <button
                    type="button"
                    // onClick={onClickOfferHelp}
                    className="stands-out-button"
                >
                <a
                      className="nav-link active  text-light"
                      aria-current="page"
                      href="./offerHelp"
                    >
                  <h3>Help Offers</h3>
                    </a>
            </button>
            <button
                type="button"
                // onClick={onClickSeekHelp}
                className="stands-out-button text-light"
            >
                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="./seekHelp"
                >
                  <h3>Help Requests</h3>
                </a>
            </button>
              </span>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <button
                className="login_button"
                onClick={() => navigate("/login")}
              >
                <h3>Log in</h3>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  login: PropTypes.bool,
};
export default Navbar;
