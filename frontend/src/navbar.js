import React from "react";
/*
We need to modify this Navbar such that it contains the new logo.
 */
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light nav fixed-top"
      id="head-banner"
      role="navigation"
    >
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a
              className="navbar-brand order-1"
              href="https://www.northeastern.edu/idea/"
            >
              <img
                id="head_logo"
                className="py-1"
                alt="logo"
                src="images/IDEA_logo_text.png"
              />
            </a>
          </li>
          <li className="nav-item dir">
            <a className="h4 nav-link text-light mt-2" href="index.html">
              Report
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-collapse collapse w-100 order-2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="d-flex btn">
              <a className="text-dark" href="login.html" target="_blank">
                Login for Contact/Feedback
              </a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
