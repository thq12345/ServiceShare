import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function CommentBox(props) {
  let postid = props.json._id;
  let [message, setmessage] = useState("");
  const [show, setShow] = useState(false);
  let [usable, setUsable] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    await fetch("/api/submit-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postid: postid,
        senderUsername: props.loginUsername,
        receiverUsername: props.json.username,
        message: message,
      }),
    });
    setShow(false);
    // window.location.reload(true);
  };

  useEffect(() => {
    if (props.loginStatus) {
      setUsable(true);
    } else {
      setUsable(false);
    }
  }, [props.loginStatus]);

  return (
    <>
      <Button
        className={"sendmessagebutton"}
        variant="primary"
        onClick={handleShow}
        disabled={!usable}
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

export default CommentBox;
