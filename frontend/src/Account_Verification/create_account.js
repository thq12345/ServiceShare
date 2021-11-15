import React, { useState } from "react";

function CreateAccount() {
  const [user, setUser] = useState({ username: "", password: "" });
  let result;
  let [current_status, set_status] = useState(false);

  let usernameChange = (event) => {
    setUser({ username: event.target.value, password: user.password });
  };
  let passwordChange = (event) => {
    setUser({ username: user.username, password: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    result = await res.json();
    set_status(result.status);
    console.log("Registration Status is: " + current_status);
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
        <h1 className="h2 mb-3 font-weight normal">Create an account</h1>
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
            Create Account
          </button>
        </div>
      </form>
      <p>Already have an account? Please sign in</p>
    </div>
  );
}

export default CreateAccount;
