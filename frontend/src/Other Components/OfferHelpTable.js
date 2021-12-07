import React, { useState } from "react";
import MoreDetails from "./MoreDetailsMainPage.js";
import { Col } from "react-bootstrap";

function OfferHelpTable({ data, totalPosts }) {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const rows = [...Array(Math.ceil(currentPost.length / 4))];
  const productRows = rows.map((row, idx) =>
    currentPost.slice(idx * 4, idx * 4 + 4)
  );
  const content = productRows.map((row, idx) => (
    <div className="row m-3e" key={idx}>
      {row.map((h, i) => (
        <Col key={"card" + i} className="card">
          <div key={"card-body" + i} className="card-body">
            <h5 key={"card-title" + i} className="posts card-title">
              {h.Category}
            </h5>
            <p key={"card-text" + i} className="posts card-text">
              {h.Description}
            </p>
            <p key={"card-text" + i} className="posts card-text">
              $ {h["Ideal Price"]}
            </p>
            <p key={"card-text" + i} className="posts card-text">
              {h["State"]}
            </p>
            <MoreDetails json={h} />
          </div>
        </Col>
      ))}
    </div>
  ));

  return (
    <>
      {content}
      <nav>
        <ul className={"pagination"}>
          {pageNumbers.map((number) => (
            <li key={number} className={"page-item"}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default OfferHelpTable;
