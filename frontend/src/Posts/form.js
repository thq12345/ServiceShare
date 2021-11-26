import React, { useState } from "react";
import AddressAutoComplete from "../Other Components/autocomplete";
function SubmitForm() {
  let [Subject, setSubject] = useState("");
  let [Category, setCategory] = useState([]);
  let [Price, setPrice] = useState(0);
  let [Date, setDate] = useState("");
  let [Zipcode, setZipcode] = useState(0);
  let [Address, setAddress] = useState("");
  let [Mode, setMode] = useState("OfferHelp");
  let [AddressAuto, setAddressAuto] = useState("");
  let [Latitude, setLatitude] = useState(0);
  let [Longitude, setLongitude] = useState(0);

  //backend return status to frontend, should be displayed as message as user's feedback.
  let [Status, setStatus] = useState("");

  let subjectChange = (event) => {
    setSubject(event.target.value);
  };
  let categoryChange = (event) => {
    setCategory(event.target.value);
  };
  let priceChange = (event) => {
    setPrice(event.target.value);
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };
  let zipcodeChange = (event) => {
    setZipcode(event.target.value);
  };
  let addressChange = (event) => {
    setAddress(event.target.value);
  };
  let modeChange = (event) => {
    setMode(event.target.value);
  };

  //when the user hit the submit button of the form
  const handleSubmit = async (event) => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    // event.preventDefault();
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Mode: Mode,
        Description: Subject,
        Category: Category,
        "Ideal Price": Price,
        "Date for task": Date,
        "Zip Code": Zipcode,
        Address: AddressAuto,
        Latitude: Latitude,
        Longitude: Longitude,
      }),
    });
    let result = await res.json();
    setStatus("Post Submission Status: " + result.status);
    console.log(Status);
  };

  return (
    <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            I am posting to...
            <select id="category" value={Mode} onChange={modeChange}>
              <option key="offer" value="OfferHelp" onChange={modeChange}>
                OfferHelp
              </option>
              <option key="seek" value="SeekHelp" onChange={modeChange}>
                SeekHelp
              </option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12">
          <div className="md-form">
            <textarea
              type="text"
              id="category"
              name="category"
              rows="1"
              value={Category}
              onChange={categoryChange}
              className="form-control md-textarea"
            ></textarea>
            <label htmlFor="message">Category</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <input
              type="text"
              id="subject"
              name="subject"
              value={Subject}
              onChange={subjectChange}
              className="form-control"
            />
            <label htmlFor="subject" className="">
              Description
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              value={Price}
              onChange={priceChange}
            />
            <label htmlFor="subject" className="">
              Price (USD per hour/item/job)
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <input
              type="text"
              id="date"
              name="date"
              className="form-control"
              value={Date}
              onChange={dateChange}
            />
            <label htmlFor="date" className="">
              Date for Subject
            </label>
          </div>
        </div>
      </div>

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

      <AddressAutoComplete
        initialaddress=""
        setaddress={setAddressAuto}
        setlatitude={setLatitude}
        setlongitude={setLongitude}
      />

      <div className="row">
        <div className="col-md-12">
          <div className="md-form">
            <textarea
              type="text"
              id="zipcode"
              name="zipcode"
              rows="1"
              value={Zipcode}
              onChange={zipcodeChange}
              className="form-control md-textarea"
            ></textarea>
            <label htmlFor="message">Zip Code</label>
          </div>
        </div>
      </div>
      <input id="Submit" type="Submit" />
    </form>
  );
}

export default SubmitForm;
