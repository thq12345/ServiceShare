import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function Main() {
  const [Posts, setPosts] = useState([]);
  let Allposts = [];
  let [Category, setCategory] = useState([]);

  let category_dropdown = useRef();
  let [Category_Select, SetCategory_Select] = useState("Select Category");
  const navigate = useNavigate();

  function onSelectCategory(evt) {
    console.log("onchange", evt.target.value);
    SetCategory_Select(evt.target.value);
  }

  //For all filter standard, leave them here.
  function postFilterHelper(post) {
    if (Category_Select === "Select Category") {
      return post;
    } else {
      return post.filter((item) => item.Category === Category_Select);
    }
  }

  useEffect(async () => {
    let raw = await fetch(`api/load-all-post?category=${Category_Select}`);
    let res = await raw.json();
    let categoryTemp = [];
    let postTemp = [];
    for (const element of res) {
      categoryTemp.push(element.Category);
      postTemp.push(element);
    }
    Allposts = postTemp;

    //remove duplicate category options.
    categoryTemp = categoryTemp.filter(function (item, pos) {
      return categoryTemp.indexOf(item) === pos;
    });
    //load all distinct category into the dropdown bar
    setCategory(categoryTemp);
    setPosts(postTemp);
    // console.log("Current Selection:", Category_Select);
    //
    // //Filtering posts so that it only has the selected category.
    // if (Category_Select === "Select Category") {
    //   //return everything when default choice
    //   setPosts(postTemp);
    // } else {
    //   let filtered_array = [];
    //   for (const element of postTemp) {
    //     if (element.Category === Category_Select) {
    //       filtered_array.push(element);
    //     }
    //   }
    //   setPosts(filtered_array);
    // }

    // fetch(`api/load-all-post?category=${Category}`)
    //   .then((res) => res.json())
    //   .then((post) => {
    //     let categoryTemp = [];
    //     // console.log("Got post", _post);
    //     // setPosts(post);
    //     Allposts = post;
    //     for (const element of post) {
    //       categoryTemp.push(element.Category);
    //     }
    //     categoryTemp = categoryTemp.filter(function (item, pos) {
    //       return categoryTemp.indexOf(item) === pos;
    //     });
    //     setCategory(categoryTemp);
    //     return Allposts;
    //   })
    //   .then((ap) => {
    //     console.log("all posts", ap);
    //     const filteredPosts = onSelectCategory(ap);
    //     console.log("filtered post", filteredPosts);
    //     setPosts(filteredPosts);
    //   });
  }, []);

  console.log("Render ", Category);
  return (
    <main className="container-fluid">
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="./index.html"
              >
                Home
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Button
                variant="secondary"
                className="d-flex btn me-auto"
                onClick={() => navigate("/login")}
              >
                <h3>Personal Profile</h3>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <div id="outer-header">
        <div className="tag">
          <span>
            <h2 className="d-inline"> I am a: </h2>
            <Button type="button" className="btn btn-lg d-inline pl-3">
              Helper
            </Button>
            <Button type="button" className="btn btn-lg d-inline pl-3 ml-2">
              Helper Seeker
            </Button>
          </span>
          {/*<Label>Enter your 5 digits ZIP Code</Label>*/}
          <h4 className="pt-3">Enter your 5 digits ZIP Code:</h4>
          <div>
            <input
              className="d-inline-block ml-5"
              type="text"
              pattern="[0-9]{5}"
              title="Five digit zip code"
            />
            <Button
              variant="secondary"
              className="btn btn-secondary d-inline-block ml-2"
              type="submit"
              value="Submit"
            >
              Go
            </Button>
          </div>
        </div>
      </div>

      <Container fluid className="pt-5 container-fluid mt-4" id="table">
        <Row>
          <Col sm={3}>
            <select
              id="category"
              value={Category_Select}
              onChange={onSelectCategory}
            >
              <option key="all" value="Select Category">
                Select Category
              </option>
              {Category.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="pt-3">
              <p>Minimum Ideal Price($):</p>
              <input type="number"></input>
            </div>
            <div className="pt-3">
              <p>Maximum Ideal Price($):</p>
              <input type="number"></input>
            </div>
            <div className="pt-3">
              <p>Date Range Available to work:</p>
              <div className="input-group input-daterange">
                <input type="text" className="form-control" />
                <div className="input-group-addon">to</div>
                <input type="text" className="form-control" />
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <table className="table">
              <tbody>
                <tr>
                  <th>Task Short Description</th>
                  <th>Zip code</th>
                  <th>Category</th>
                  <th>Ideal Price/hr</th>
                  <th>Date for task</th>
                  <th>Address</th>
                </tr>
                {postFilterHelper(Posts).map((p, i) => (
                  <tr key={i}>
                    <th>{p.Description}</th>
                    <th>{p["Zip Code"]}</th>
                    <th>{p.Category}</th>
                    <th>{p["Ideal Price"]}</th>
                    <th>{p["Date for task"]}</th>
                    <th>{p.Address}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

      <hr></hr>
      <footer>Created by Tianhao Qu, Kaiwen Tian</footer>
    </main>
  );
}

export default Main;
