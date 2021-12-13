import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddressAutoComplete from "../Other Components/autocomplete";

function SubmitForm() {
  let [Subject, setSubject] = useState("");
  let [Category, setCategory] = useState("Select Category");
  let [Price, setPrice] = useState("");
  let [Date, setDate] = useState("");
  let [Zipcode, setZipcode] = useState("");
  let [Address, setAddress] = useState("");
  let [Latitude, setLatitude] = useState(0);
  let [State, setState] = useState("");
  let [Longitude, setLongitude] = useState(0);
  let [Mode, setMode] = useState("OfferHelp");
  let [show, setShow] = useState(false);
  let [Errora, setError] = useState("");
  const categoryOptions = [
    "Select Category",
    "Chore",
    "Academic",
    "Cleaning",
    "House Handy Work",
    "Baby Sitting",
    "Moving",
    "Pet Care",
    "Shopping",
  ];
  let subjectChange = (event) => {
    setSubject(event.target.value);
  };
  let priceChange = (event) => {
    setPrice(event.target.value);
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };
  let modeChange = (event) => {
    setMode(event.target.value);
  };

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    //type checker to ensure numbers are numbers, strings are strings etc.
    if (Category === "Select Category" || isNaN(parseInt(Price))) {
      if (Category === "Select Category" && isNaN(parseInt(Price))) {
        setError("Please select a category and input a valid price.");
      } else if (Category === "Select Category") {
        setError("Please select a category.");
      } else if (isNaN(parseInt(Price))) {
        setError("Price given is invalid. Please try again.");
      }
    } else {
      try {
        await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Mode: Mode,
            Description: Subject,
            Category: Category,
            "Ideal Price": parseInt(Price),
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
      } catch (e) {}
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Submit a New Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id="submitPost"
        aria-labelledby="submitPost"
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit a New Post</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <p>{Errora}</p>
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

                {/*<div className="row mt-2 mb-2">*/}
                  <select
                    className="category my-3"
                    aria-label="category"
                    value={Category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {/*<Categories></Categories>*/}
                    {categoryOptions.map((p, i) => (
                      <option key={"categoryoptions" + i} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                {/*</div>*/}
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
