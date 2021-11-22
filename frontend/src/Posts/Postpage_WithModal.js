import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import SubmitForm from "./form.js";
import ModifyPost from "./modify_post.js";
function PostForm2() {
  const [modalShow, setModalShow] = React.useState(false);

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

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Submit a New Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SubmitForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main className="container">
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Welcome!
        </h2>

        <div>
          <Button variant="secondary" onClick={() => setModalShow(true)}>
            Submit a New Post
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </section>

      <section className="pt-5">
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
    </main>
  );
}
export default PostForm2;