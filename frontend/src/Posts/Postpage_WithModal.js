import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ModifyPost from "./modify_post.js";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import SubmitForm from "./submitform";

function PostForm2() {
  const navigate = useNavigate();

  //all posts that belongs to this user.
  const [Post, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/load-user-posts")
      .then((res) => res.json())
      .then((post) => {
        console.log("Got post", post);
        setPosts(post);
      });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li>
              <img
                src={logo}
                className="nav-item, nav_logo"
                alt="Service Share Logo"
              ></img>
            </li>
            <li className="nav-item pt-2">
              <a className="nav-link active" aria-current="page" href="./">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="container mb-4">
        <h1 className="h1-responsive font-weight-bold text-center my-4">
          Welcome!
        </h1>
        <div></div>
        <SubmitForm />

        {/*  <div>*/}
        {/*    <Button variant="secondary" onClick={() => setModalShow(true)}>*/}
        {/*      Submit a New Post*/}
        {/*    </Button>*/}

        {/*    <MyVerticallyCenteredModal*/}
        {/*      show={modalShow}*/}
        {/*      onHide={() => setModalShow(false)}*/}
        {/*    />*/}
        {/*  </div>*/}
      </section>

      <section className="pt-5 container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Ideal Price</th>
              <th scope="col">Date for task</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Address</th>
              <th scope="col">Post Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="post_content">
            {Post.map((p, i) => (
              <tr key={i}>
                <th>{i}</th>
                <td>{p.username}</td>
                <td>{p.Category}</td>
                <td>{p.Description}</td>
                <td>{p["Ideal Price"]}</td>
                <td>{p["Date for task"]}</td>
                <td>{p["Zip Code"]}</td>
                <td>{p.Address}</td>
                <td>{p.Mode}</td>
                <td>
                  <ModifyPost information={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

// MyVerticallyCenteredModal.propTypes = {
//   onHide: PropTypes.func,
//   show: PropTypes.bool,
// };

export default PostForm2;
