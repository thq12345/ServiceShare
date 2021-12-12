import React, { useEffect, useState } from "react";
import ModifyPost from "./modify_post.js";
import SubmitForm from "./submitform";
import MessageReceived from "./MessageBox";
import Navbar from "../Main Page Components/Navbar";
function PostForm2() {
  //all posts that belongs to this user.
  const [Post, setPosts] = useState([]);
  let [login, setLogin] = useState(false);

  useEffect(() => {
    async function func() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      if (loginStatus.user !== undefined) {
        setLogin(true);
        fetch("/api/load-user-posts")
          .then((res) => res.json())
          .then((post) => {
            console.log("Got post", post);
            setPosts(post);
          });
      }
    }
    func();
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
      <Navbar login={login} />
      <section className="container mb-4">
        <h1 className="h1-responsive font-weight-bold text-center my-4">
          Welcome!
        </h1>
        <SubmitForm />
      </section>

      <section className="pt-5 container">
        <LoadPost />
      </section>
    </>
  );
}

export default PostForm2;
