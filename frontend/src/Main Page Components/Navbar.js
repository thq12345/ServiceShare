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
            <li className="nav-item pt-2">
              <a className="nav-link active" aria-current="page" href="./">
                Home
              </a>
            </li>
            <li className="nav-item pt-2">
              <a
                className="nav-link active"
                aria-current="page"
                href="./offerHelp"
              >
                Offer Help
              </a>
            </li>
            <li className="nav-item pt-2">
              <a
                className="nav-link active"
                aria-current="page"
                href="./seekHelp"
              >
                Seek Help
              </a>
            </li>
            <li className="nav-item pt-2">
              <a className="nav-link active" aria-current="page" href="./post">
                Post
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Button
                variant="secondary"
                className="d-flex btn me-auto"
                onClick={onLogOutHandler}
              >
                <h3>Log Out</h3>
              </Button>
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
            <li className="nav-item pt-2">
              <a className="nav-link active" aria-current="page" href="./">
                Home
              </a>
            </li>
            <li className="nav-item pt-2">
              <a
                className="nav-link active"
                aria-current="page"
                href="./offerHelp"
              >
                Offer Help
              </a>
            </li>
            <li className="nav-item pt-2">
              <a
                className="nav-link active"
                aria-current="page"
                href="./seekHelp"
              >
                Seek Help
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Button
                variant="secondary"
                className="d-flex btn me-auto"
                onClick={() => navigate("/login")}
              >
                <h3>Log in</h3>
              </Button>
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
