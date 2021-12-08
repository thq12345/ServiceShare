import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddressAutoComplete from "../Other Components/autocomplete";
import PropTypes from "prop-types";
import Categories from "../Other Components/Categories";
function ModifyPost(props) {
  let [Subject, setSubject] = useState(props.information.Description);
  let [Category, setCategory] = useState(props.information.Category);
  let [Price, setPrice] = useState(props.information["Ideal Price"]);
  let [Date, setDate] = useState(props.information["Date for task"]);
  let [Zipcode, setZipcode] = useState(props.information["Zip Code"]);
  let [Address, setAddress] = useState(props.information["Address"]);
  let [Latitude, setLatitude] = useState(props.information.Latitude);
  let [GeoState, setGeoState] = useState(props.information["State"]);
  let [Longitude, setLongitude] = useState(props.information.Longitude);
  //Change is not permitted between Seek Help and Offer Help.
  const Mode = props.information.Mode;
  const id = props.information._id;

  let subjectChange = (event) => {
    setSubject(event.target.value);
  };

  let priceChange = (event) => {
    setPrice(event.target.value);
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };

  //when the user hit the submit button of the form
  const handleEdit = async (event) => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    // event.preventDefault();
    await fetch("/api/edit-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        Mode: Mode,
        Description: Subject,
        Category: Category,
        "Ideal Price": Price,
        "Date for task": Date,
        "Zip Code": Zipcode,
        Address: Address,
        Latitude: Latitude,
        Longitude: Longitude,
        State: GeoState,
      }),
    });
    setShow(false);
    window.location.reload(true);
  };

  //when the user hit the submit button of the form
  const handleDelete = async (event) => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    // event.preventDefault();
    await fetch("/api/delete-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        Mode: Mode,
        Description: Subject,
        Category: Category,
        "Ideal Price": Price,
        "Date for task": Date,
        "Zip Code": Zipcode,
        Address: Address,
      }),
    });
    setShow(false);
    window.location.reload(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Edit or Delete Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit or Delete Post</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
            <div className="row mb-2">
              <select
                id="category"
                aria-label="category"
                value={Category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <Categories></Categories>
              </select>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="subject" className="">
                    Description
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={Subject}
                    onChange={subjectChange}
                    className="form-control"
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="price">Price (USD per hour/item/job)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    value={Price}
                    onChange={priceChange}
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="date" className="">
                    Date for Subject
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={Date}
                    onChange={dateChange}
                  />
                  <br />
                </div>
              </div>
            </div>

            <AddressAutoComplete
              initialaddress={Address}
              setaddress={setAddress}
              setlatitude={setLatitude}
              setlongitude={setLongitude}
              setGeoState={setGeoState}
              setZip={setZipcode}
            />
            {/*<div className="row">*/}
            {/*  <div className="col-md-12">*/}
            {/*    <div className="md-form mb-0">*/}
            {/*      <input*/}
            {/*        type="text"*/}
            {/*        id="address"*/}
            {/*        name="address"*/}
            {/*        className="form-control"*/}
            {/*        value={Address}*/}
            {/*        onChange={addressChange}*/}
            {/*      />*/}
            {/*      <label htmlFor="address" className="">*/}
            {/*        Address*/}
            {/*      </label>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div className="row">*/}
            {/*  <div className="col-md-12">*/}
            {/*    <div className="md-form">*/}
            {/*      <label htmlFor="zipcode">Zip Code</label>*/}
            {/*      <textarea*/}
            {/*        type="text"*/}
            {/*        id="zipcode"*/}
            {/*        name="zipcode"*/}
            {/*        rows="1"*/}
            {/*        value={Zipcode}*/}
            {/*        onChange={zipcodeChange}*/}
            {/*        className="form-control md-textarea"*/}
            {/*      ></textarea>*/}
            {/*      <br />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEdit}>
              Confirm Edit
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

ModifyPost.propTypes = {
  information: PropTypes.object,
};
export default ModifyPost;
