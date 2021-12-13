import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function MessageReceived(props) {
  let [message, setMessage] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function func() {
      fetch("/api/get-received-message")
        .then((res) => res.json())
        .then((post) => {
          // console.log("Got message", post);
          setMessage(post.filter((item) => item.postid === props.postid));
        });
    }
    func();
  }, [props.postid]);

  if (message.length === 0) {
    return (
      <>
        <Button variant="primary" onClick={handleShow} disabled={true}>
          No Comment
        </Button>

        <Modal
          show={show}
          id={"moreDetailModal"}
          onHide={handleClose}
          aria-labelledby="moreDetailModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>No comment is available for this post.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Comments({message.length})
        </Button>

        <Modal
          show={show}
          id={"moreDetailModal"}
          onHide={handleClose}
          aria-labelledby="moreDetailModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">From</th>
                  <th scope={"col"}>Message</th>
                </tr>
              </thead>
              <tbody id="post_content">
                {message.map((p, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{p.senderUsername}</td>
                    <td>{p.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MessageReceived;
