import React, { useEffect, useState } from "react";
import { use } from "express/lib/router";

function PostForm2() {
  //will change the form layout later
  const [Username, setUsername] = useState("");
  const [Subject, setSubject] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState(0);
  const [Date, setDate] = useState("");
  const [Zipcode, setZipcode] = useState(0);
  const [Address, setAddress] = useState("");
  //backend return status to frontend, should be displayed as message as user's feedback.
  const [Status, setStatus] = useState("");
  //all posts that belongs to this user.
  const [Post, setPosts] = useState([]);
  let usernameChange = (event) => {
    setUsername(event.target.value);
  };
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

  //when the user hit the submit button of the form
  const handleSubmit = async (event) => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    // event.preventDefault();
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Username,
        Description: Subject,
        Category: Category,
        "Ideal Price": Price,
        "Date for task": Date,
        "Zip Code": Zipcode,
        Address: Address,
      }),
    });
    let result = await res.json();
    setStatus("Post Submission Status: " + result.status);
    console.log("Post Submission Status is: " + result.status);
  };

  useEffect(() => {
    fetch("/api/load-user-posts")
      .then((res) => res.json())
      .then((post) => {
        console.log("Got post", post);
        setPosts(post);
      });
  }, []);

  return (
    <main className="container">
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Post here(Title)!!!!
        </h2>

        <p className="text-center w-responsive mx-auto mb-5">
          Please post here!!!!
        </p>

        <div className="row">
          <div className="col-md-12 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
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

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      value={Address}
                      onChange={addressChange}
                    />
                    <label htmlFor="address" className="">
                      Address
                    </label>
                  </div>
                </div>
              </div>

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

              <input id="Submit" type="submit" value="Submit" />
            </form>

            <div className="status"></div>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Ideal Price</th>
              <th scope="col">Date for task</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody id="post_content">
            {Post.map((p, i) => (
              <tr key={i}>
                <th>{i}</th>
                <td>{p.username}</td>
                <td>{p.Description}</td>
                <td>{p.Category}</td>
                <td>{p["Ideal Price"]}</td>
                <td>{p["Date for task"]}</td>
                <td>{p["Zip Code"]}</td>
                <td>{p.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
export default PostForm2;
