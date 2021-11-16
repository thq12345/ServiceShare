import React, { useState } from "react";

function PostForm() {
  const [form, setForm] = useState({ title: "", text: "", address: "" });
  const [status, setStatus] = useState("");

  let titleChange = (event) => {
    setForm({
      title: event.target.value,
      text: form.text,
      address: form.address,
    });
  };
  let textChange = (event) => {
    setForm({
      title: form.title,
      text: event.target.value,
      address: form.address,
    });
  };
  let addressChange = (event) => {
    setForm({
      title: form.title,
      text: form.text,
      address: event.target.address,
    });
  };

  return (
    <form
      id="contact-form"
      name="contact-form"
      action="/submit-feedback"
      method="POST"
    >
      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
            />
            <label htmlFor="subject" className="">
              Subject
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="md-form">
            <textarea
              type="text"
              id="message"
              name="message"
              rows="2"
              className="form-control md-textarea"
            />
            <label htmlFor="message">Your message</label>
          </div>
        </div>
      </div>

      <input id="Submit" type="submit" value="Submit" />
    </form>
  );
}
export default PostForm;
