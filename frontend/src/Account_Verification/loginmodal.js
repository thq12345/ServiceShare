import { Button, Modal, ModalBody } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Login_modal() {
  let [show, setShow] = useState(false);
  let [ShowCreate, setShowCreate] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleCreateClose = () => setShowCreate(false);
  let handleCreateShow = () => setShowCreate(true);

  const [user, setUser] = useState({ username: "", password: "" });
  let [current_status, set_status] = useState("");
  let [create_account_status, set_create_account_status] = useState("");
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

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    let result = await res.json();
    if (result.status === "account-exists") {
      await set_create_account_status(
        "The username you are trying to create already exists. Please try again!"
      );
    } else {
      handleCreateClose();
    }
  };

  function Create_comp() {
    return (
      <form
        // need to change this I guess (css)
        id="Login Form"
        onSubmit={handleCreateAccount}
        className={"login-container  justify-content-center align-self-center"}
      >
        <h1 className="h2 mb-3 font-weight normal">Create an account</h1>
        <p>{create_account_status}</p>
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
        <br />
        <p>
          Already have an account?{" "}
          <button
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Log In
          </button>
        </p>
      </form>
    );
  }

  function Login_comp() {
    return (
      <form
        id="Login Form"
        onSubmit={handleAuth}
        className={"login-container justify-content-center align-self-center"}
      >
        <h1 className="h2 mb-1 font-weight normal">Please sign in</h1>
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
        <div className="mt-1">
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
          Don't have an account?
          <button
            onClick={() => {
              handleCreateShow();
            }}
          >
            Create Account
          </button>
        </p>
      </form>
    );
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Login Modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center h-50">
            <img
              className="mt-1 mb-2 logo-modal align-items-center"
              src={logo}
              alt="Service Share Logo"
            />
            <Login_comp />
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={ShowCreate} onHide={handleCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center h-50">
            <img
              className="mt-1 mb-2 logo-modal align-items-center"
              src={logo}
              alt="Service Share Logo"
            />
            <Create_comp />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login_modal;
