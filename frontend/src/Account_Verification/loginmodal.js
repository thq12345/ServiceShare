import {Button, Modal, ModalBody} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png";

function Login_modal(){
    let [show, setShow] = useState(false);
    let [ShowCreate, setShowCreate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    function Create_comp(){
        return(
            <form
                // need to change this I guess (css)
                id="Login Form"
                onSubmit={handleAuth}
                className={"login-container  justify-content-center align-self-center"}
            >
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
                <br />
                <p>
                    Already have an account? <button
                    onChange={(e) => {
                        setShowCreate(false);
                    }
                    }>
                    Log In
                </button>
                </p>
            </form>
        );
    }

    function Login_comp(){
        return(
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
                    onChange={(e) => {
                        setShowCreate(true);
                    }
                }>
                    Create Account
            </button>
            </p>
        </form>
        );
    }

    return(<>
        <Button variant="secondary" onClick={handleShow}>
            Login Modal
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Submit a New Post</Modal.Title>
            </Modal.Header>
        <form>
        <Modal.Body>
            <div className="text-center h-50">
                <img
                    className="mt-1 mb-2 logo-modal align-items-center"
                    src={logo}
                    alt="Service Share Logo"
                />
                {!ShowCreate ? <Login_comp/>: null}
                {ShowCreate ? <Create_comp/>: null}
            </div>
        </Modal.Body>
    </form>
    </Modal>
    </>);
}

export default Login_modal;