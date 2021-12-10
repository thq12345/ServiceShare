import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DirectMessage(props) {
  let postid = props.json._id;
  let [username, setusername] = useState("");
  let [message, setmessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    await fetch("/api/submit-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postid: postid,
        senderUsername: username,
        receiverUsername: props.json.username,
        message: message,
      }),
    });
    setShow(false);
    // window.location.reload(true);
  };

  return (
    <>
      <Button
        className={"sendmessagebutton"}
        variant="primary"
        onClick={handleShow}
      >
        Message
      </Button>

      <Modal
        show={show}
        id={"messageModal"}
        onHide={handleClose}
        aria-labelledby="messageModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send me a message!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Id for this post: {postid}</p>
          <label>Username</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={username}
            onChange={(event) => setusername(event.target.value)}
            className="form-control"
            placeholder={
              "Username (Please use your email address if you don't have an account. Your message will sync automatically when you create one later)"
            }
          />
          <label>Message</label>
          <textarea
            type="text"
            id="subject"
            name="subject"
            value={message}
            onChange={(event) => setmessage(event.target.value)}
            className="form-control"
            placeholder={"Message"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DirectMessage;
