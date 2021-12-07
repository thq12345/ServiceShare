import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddressAutoComplete from "../Other Components/autocomplete";
import Categories from "../Other Components/Categories.js";

function SubmitForm() {
  let [Subject, setSubject] = useState("");
  let [Category, setCategory] = useState("Select Category");
  let [Price, setPrice] = useState(0);
  let [Date, setDate] = useState("");
  let [Zipcode, setZipcode] = useState("");
  let [Address, setAddress] = useState("");
  let [Latitude, setLatitude] = useState(0);
  let [State, setState] = useState("");
  let [Longitude, setLongitude] = useState(0);
  let [Mode, setMode] = useState("OfferHelp");
  let [show, setShow] = useState(false);
  let subjectChange = (event) => {
    setSubject(event.target.value);
  };
  // let categoryChange = (event) => {
  //   setCategory(event.target.value);
  // };
  let priceChange = (event) => {
    setPrice(parseInt(event.target.value));
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };
  let zipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  let modeChange = (event) => {
    setMode(event.target.value);
  };

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Mode: Mode,
        Description: Subject,
        Category: Category,
        "Ideal Price": Price,
        "Date for task": Date,
        "Zip Code": Zipcode,
        Address: Address,
        Latitude: Latitude,
        Longitude: Longitude,
        State: State,
      }),
    });
    setShow(false);
    window.location.reload(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Submit a New Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a New Post</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <div className="md-form mb-0">
                    I am posting to...
                    <select
                      id="categorySelect"
                      aria-label="categorySelect"
                      value={Mode}
                      onChange={modeChange}
                    >
                      <option
                        key="offer"
                        value="OfferHelp"
                        onChange={modeChange}
                      >
                        OfferHelp
                      </option>
                      <option key="seek" value="SeekHelp" onChange={modeChange}>
                        SeekHelp
                      </option>
                    </select>
                  </div>
                </div>

                <div className="row mt-2 mb-2">
                  <select
                    className="category"
                    aria-label="category"
                    value={Category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <Categories></Categories>
                  </select>

                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="subject">Description</label>
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
                    type="text"
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
                  <label htmlFor="date">Date for Subject</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
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
              setGeoState={setState}
              setZip={setZipcode}
            />

            {/*<div className="row">*/}
            {/*  <div className="col-md-12">*/}
            {/*    <div className="md-form">*/}
            {/*      <label htmlFor="zipcode">Zip Code</label>*/}
            {/*      <input*/}
            {/*        type="text"*/}
            {/*        id="zipcode"*/}
            {/*        name="zipcode"*/}
            {/*        rows="1"*/}
            {/*        value={Zipcode}*/}
            {/*        onChange={zipcodeChange}*/}
            {/*        className="form-control md-textarea"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default SubmitForm;
