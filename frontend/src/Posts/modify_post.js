import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddressAutoComplete from "../Other Components/autocomplete";
import PropTypes from "prop-types";
// import Categories from "../Other Components/Categories";
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
  let [Error, setError] = useState("");
  //Change is not permitted between Seek Help and Offer Help.
  const Mode = props.information.Mode;
  const id = props.information._id;
  const categoryOptions = [
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

  let categoryChange = (event) => {
    setCategory(event.target.value);
  };
  //when the user hit the submit button of the form
  const handleEdit = async () => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    if (Category === "Select Category" || isNaN(parseInt(Price))) {
      if (Category === "Select Category" && isNaN(parseInt(Price))) {
        setError("Please select a category and input a valid price.");
      } else if (Category === "Select Category") {
        setError("Please select a category.");
      } else if (isNaN(parseInt(Price))) {
        setError("Price given is invalid. Please try again.");
      }
    } else {
      await fetch("/api/edit-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          Mode: Mode,
          Description: Subject,
          Category: Category,
          "Ideal Price": parseInt(Price),
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
    }
  };

  //when the user hit the delete button of the form
  const handleDelete = async () => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    if (Category === "Select Category" || isNaN(parseInt(Price))) {
      if (Category === "Select Category" && isNaN(parseInt(Price))) {
        setError("Please select a category and input a valid price.");
      } else if (Category === "Select Category") {
        setError("Please select a category.");
      } else if (isNaN(parseInt(Price))) {
        setError("Price given is invalid. Please try again.");
      }
    } else {
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
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Edit or Delete Post
      </Button>

      <Modal
        show={show}
        id="modifyPost"
        onHide={handleClose}
        aria-labelledby={"modifyPost"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit or Delete Post</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
              <p>{Error}</p>
              <select
                className={"category mb-2"}
                aria-label="category"
                value={Category}
                onChange={categoryChange}
              >
                {/*<Categories />*/}
                {categoryOptions.map((p, i) => (
                  <option key={"categoryoption" + i} value={p}>
                    {p}
                  </option>
                ))}
              </select>

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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEdit}>
              Confirm Edit
            </Button>
            <Button
              variant="primary"
              onClick={handleDelete}
              style={{ backgroundColor: "#BF181D" }}
            >
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
