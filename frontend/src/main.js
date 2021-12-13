import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Main Page Components/Navbar.js";
//From here, seek help means posts that seek help
//offer help means posts that offer help
function Main() {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function run() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      if (loginStatus.user !== undefined) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
    run().catch(console.dir);
  });

  //Title Component
  function Title() {
    return (
      <div className="d-flex justify-content-center align-content-end">
        <div className={"tag"}>
          <h1 className={"mt-2"} style={{ fontSize: "25px" }}>
            Service share is a platform for you to hire someone to get the job
            done or to help someone else and get some 💰 as well:)
          </h1>
          <h2 className={"mt-2"} style={{ fontSize: "25px" }}>
            Feel free to browse existing posts and post one if you want!
          </h2>
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
