import React, { useState } from "react";
import MoreDetails from "./MoreDetailsMainPage.js";
import PropTypes from "prop-types";

function SeekHelpTable({ data, totalPosts, loginStatus, loginUsername }) {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <table className="posts">
        <thead>
          <tr>
            <th>Category</th>
            <th>Task Short Description</th>
            <th>Ideal Price/hr</th>
            <th>Date for task</th>
            <th>State</th>
            <th>More details</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((p, i) => (
            <tr key={i}>
              <th>{p.Category}</th>
              <th>{p.Description}</th>
              <th>{p["Ideal Price"]}</th>
              <th>{p["Date for task"]}</th>
              <th>{p["State"]}</th>
              <td>
                <MoreDetails
                  json={p}
                  loginStatus={loginStatus}
                  loginUsername={loginUsername}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className={"pagination"}>
          {pageNumbers.map((number) => (
            <li key={number} className={"page-item"}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SeekHelpTable;
