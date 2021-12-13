import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function LoginForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  let [current_status, set_status] = useState("");
  let navigate = useNavigate();

  let usernameChange = (event) => {
    setUser({ username: event.target.value, password: user.password });
  };
  let passwordChange = (event) => {
    setUser({ username: user.username, password: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/login-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    let result = await res.json();

    if (result.status === false) {
      set_status("Incorrect username/password! Please try again!");
    }

    if (result.status === true) {
      navigate("/post");
    }
  };

  return (
    <div className="text-center  h-100">
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li>
              <img
                src={logo}
                className="nav-item, nav_logo"
                alt="Service Share Logo"
              ></img>
            </li>
            <li className="nav-item pt-2">
              <a className="nav-link active" aria-current="page" href="./">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <img
        className="mt-4 mb-4 logo-imagerow align-items-center h-100"
        src={logo}
        alt="Service Share Logo"
      />
      <form
        id="Login Form"
        onSubmit={handleAuth}
        className={"login-container  justify-content-center align-self-center"}
      >
        <h1 className="h2 mb-3 font-weight normal">Please sign in</h1>
        <p>{current_status}</p>
        <label className="sr-only"> Email Address </label>
        <input
          type="email"
          id="emailAddress"
          className="form-control"
          placeholder="User Name"
          name="username"
          value={user.username}
          onChange={usernameChange}
          required
          autoFocus
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={passwordChange}
          className="form-control"
        />
        <div className="mt-3">
          <button
            id="Submit"
            className="btn btn-lg btn-primary btn-block"
            type="Submit"
            value="Submit"
          >
            Sign in
          </button>
        </div>
        <br />
        <p>
          Don't have an account?{" "}
          <a href="/create-account" style={{ color: "black" }}>
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
