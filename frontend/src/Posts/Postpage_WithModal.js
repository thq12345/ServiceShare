import React, { useEffect, useState } from "react";
import ModifyPost from "./modify_post.js";
import logo from "../images/logo.png";
import SubmitForm from "./submitform";
import MessageReceived from "./MessageBox";
function PostForm2() {
  //all posts that belongs to this user.
  const [Post, setPosts] = useState([]);

  useEffect(async () => {
    let status = await fetch("/loginStatus");
    let loginstatus = await status.json();
    console.log("Login Status is:", loginstatus);
  });

  useEffect(() => {
    fetch("/api/load-user-posts")
      .then((res) => res.json())
      .then((post) => {
        console.log("Got post", post);
        setPosts(post);
      });
  }, []);

  function LoadPost() {
    if (Post.length === 0) {
      return (
        <p style={{ fontSize: "30px" }}>
          No post is available for this account😅 Please submit a post first.
        </p>
      );
    } else {
      return (
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
              <th scope="col">Comments</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="post_content">
            {Post.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.username}</td>
                <td>{p.Category}</td>
                <td>{p.Description}</td>
                <td>{p["Ideal Price"]}</td>
                <td>{p["Date for task"]}</td>
                <td>{p["Zip Code"]}</td>
                <td>{p.Address}</td>
                <td>{p.Mode}</td>
                <td>
                  <MessageReceived postid={p._id} />
                </td>
                <td>
                  <ModifyPost information={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
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
              />
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
      </section>

      <section className="pt-5 container">
        <LoadPost />
      </section>
      {/*<section className="pt-5 container">*/}
      {/*  <MessageReceived />*/}
      {/*</section>*/}
    </>
  );
}

export default PostForm2;
