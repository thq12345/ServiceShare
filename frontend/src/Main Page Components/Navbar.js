import logo from "../images/logo.png";
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

  let onHomeHandler = () => {
    navigate("/");
  };

  let onOfferHandler = () => {
    navigate("/offerHelp");
  };

  let onSeekHandler = () => {
    navigate("/seekHelp");
  };

  let onPostHandler = () => {
    navigate("/post");
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
                onClick={onHomeHandler}
                className="stands-out-button"
              >
                <h3 className={"nav-link active text-light"}>Home</h3>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="stands-out-button"
                onClick={onOfferHandler}
              >
                <h3 className={"nav-link active text-light"}>Offer Help</h3>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="stands-out-button"
                onClick={onSeekHandler}
              >
                <h3 className={"nav-link active text-light"}>Seek Help</h3>
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="stands-out-button"
                onClick={onPostHandler}
              >
                <h3 className={"nav-link active text-light"}>Post</h3>
              </button>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <button className="login_button" onClick={onLogOutHandler}>
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
                onClick={onHomeHandler}
                className="stands-out-button"
              >
                <h3 className={"nav-link active text-light"}>Home</h3>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="stands-out-button"
                onClick={onOfferHandler}
              >
                <h3 className={"nav-link active text-light"}>Offer Help</h3>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="stands-out-button"
                onClick={onSeekHandler}
              >
                <h3 className={"nav-link active text-light"}>Seek Help</h3>
              </button>
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
