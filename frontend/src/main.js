import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Main Page Components/Navbar.js";
//From here, seek help means posts that seek help
//offer help means posts that offer help
function Main() {
  const navigate = useNavigate();
  let [login, setLogin] = useState(false);
  // let [loginUsername, setLoginUsername] = useState("");

  let onClickOfferHelp = () => {
    navigate("/offerHelp");
  };

  let onClickSeekHelp = () => {
    navigate("/seekHelp");
  };

  useEffect(() => {
    async function run() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      console.log("Login Status is:", loginStatus.user);
      if (loginStatus.user !== undefined) {
        setLogin(true);
        // setLoginUsername(loginStatus.user);
      } else {
        setLogin(false);
        // setLoginUsername("");
      }
    }
    run();
  });

  //Title Component
  function Title() {
    return (
      <div
        className="d-flex justify-content-center align-content-end"
        id="outer-header"
      >
        <div className="tag">
          <span>
            <h1
              className="d-inline header_text_section rounded mt-4"
              style={{ fontSize: "30px" }}
            >
              {" "}
              I am here to...{" "}
            </h1>
            <button
              type="button"
              onClick={onClickOfferHelp}
              className="stands-out-button"
            >
              Offer Help
            </button>
            <button
              type="button"
              onClick={onClickSeekHelp}
              className="stands-out-button"
            >
              Seek Help
            </button>
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <Navbar login={login} />
        <Title />
      </div>
    </>
  );
}

export default Main;
