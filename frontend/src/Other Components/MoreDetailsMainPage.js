import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Map from "./map.js";
import PropTypes from "prop-types";
function MoreDetails(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // Xuejia Yang: Please add a dollar sign before price!
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email: {props.json.username}</p>
          <p>Price: {props.json["Ideal Price"]}</p>
          <p>Address: {props.json.Address}</p>
          <p>Location on Map:</p>
          <Map
            longitude={props.json.Longitude}
            latitude={props.json.Latitude}
          />
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

MoreDetails.propTypes = {
  json: PropTypes.object,
};

export default MoreDetails;
