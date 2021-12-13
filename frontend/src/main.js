import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Main Page Components/Navbar.js";
//From here, seek help means posts that seek help
//offer help means posts that offer help
function Main() {
  let [login, setLogin] = useState(false);

  //Title Component
  function Title() {
    return (
      <div
        className="d-flex justify-content-center align-content-end"
      >
        <div className={"tag"}>
          <h3 className={"mt-2"}>Service share is a platform for you to share and offer any kinds of service with people that has opposing needs.</h3>
          <h3>Feel free to browse and post anything that you want to offer/seek</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid page">
        <Navbar login={login} />
        <Title />
      </div>
    </>
  );
}

export default Main;
