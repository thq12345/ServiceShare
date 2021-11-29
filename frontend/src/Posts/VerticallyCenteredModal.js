import { Button, Modal } from "react-bootstrap";
import SubmitForm from "./form";
import React from "react";
import PropTypes from "prop-types";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Submit a New Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SubmitForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default MyVerticallyCenteredModal;
