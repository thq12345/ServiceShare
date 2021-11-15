import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function LoginForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  let result;
  let [current_status, set_status] = useState("");
  // const change_status = useRef("");

  let usernameChange = (event) => {
    setUser({ username: event.target.value, password: user.password });
  };
  let passwordChange = (event) => {
    setUser({ username: user.username, password: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const res = await fetch("/login-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    result = await res.json();
    set_status("Current Login Status is: " + result.status);
    console.log("Login Status is: " + result.status);
    if (result.status) {
      //Redirect to Post page
      return <Navigate to="/login" />;
    } else {
      //Show error
    }
  };

  return (
    <div className="text-center">
      <form
        // need to change this I guess (css)
        id="Login Form"
        onSubmit={handleAuth}
      >
        <img
          className="mt-4 mb-4"
          src="../../images/logo.png"
          alt="Service Share Logo"
        />
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
      </form>
    </div>
  );
}

export default LoginForm;
