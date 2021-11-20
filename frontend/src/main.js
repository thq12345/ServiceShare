import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col, Tab} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function Main() {
  const [Posts, setPosts] = useState([]);
  const [Helpers, setHelpers] = useState([]);
  let [Category, setCategory] = useState([]);
  let [Category_Select, SetCategory_Select] = useState("Select Category");
  let [MinValue, setMinValue] = useState(0);
  let [MaxValue, setMaxValue] = useState(10000);
  let[ShowHelper, setHelperPage] = useState(false);

  const navigate = useNavigate();

  function onSelectCategory(evt) {
    console.log("onchange", evt.target.value);
    SetCategory_Select(evt.target.value);
  }

  function onSelectedValueMin(evt) {
    setMinValue(evt.target.value);
  }

  function onSelectedValueMax(evt) {
    setMaxValue(evt.target.value);
  }

  //For all filter standard, leave them here.
  function postFilterHelper(post) {
    let filtered_post;
    //Category Filter
    if (Category_Select === "Select Category") {
      filtered_post = post;
    } else {
      filtered_post = post.filter((item) => item.Category === Category_Select);
    }

    //Price Range Filter
    filtered_post = filtered_post.filter(
        (item) =>
            item["Ideal Price"] <= MaxValue && item["Ideal Price"] >= MinValue
    );
    return filtered_post;
  }

  useEffect(async () => {
    let raw = await fetch(`api/load-helpers`);
    let res = await raw.json();
    // let categoryTemp = [];
    let helper = [];
    for (const element of res) {
      // categoryTemp.push(element.Category);
      helper.push(element);
    }
    setHelpers(helper);
  }, []);

  useEffect(async () => {
    let raw = await fetch(`api/load-all-post?category=${Category_Select}`);
    let res = await raw.json();
    let categoryTemp = [];
    let postTemp = [];
    for (const element of res) {
      categoryTemp.push(element.Category);
      postTemp.push(element);
    }

    //remove duplicate category options.
    categoryTemp = categoryTemp.filter(function (item, pos) {
      return categoryTemp.indexOf(item) === pos;
    });
    //load all distinct category into the dropdown bar
    setCategory(categoryTemp);
    setPosts(postTemp);

  }, []);

  console.log("Render ", Category);

  function Helper_table() {
    const rows = [...Array( Math.ceil(Helpers.length / 4) )];
    const productRows = rows.map( (row, idx) => Helpers.slice(idx * 4, idx * 4 + 4) );
    console.log(productRows[0]);
    const content = productRows.map((row, idx) => (
        <div className="row m-3" key={idx}>
          { row.map((h, i) =>             <Col className="card">
            <div className="card-body">
              <h5 className="card-title">{h.Name}</h5>
              <p className="card-text">{h.Description}</p>
              <img src={h['Image']} className="card-img-top" alt="Image not showing"></img>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </Col> )}
        </div> )
    );
    return (
        <Container>
          {content}
        </Container>
    );
  }

  let PostTable = () => <Container fluid className="pt-5 container-fluid mt-4" id="table">
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
          <input
              type="number"
              value={MinValue}
              onChange={onSelectedValueMin}
          ></input>
          <p>Maximum Ideal Price($):</p>
          <input
              type="number"
              value={MaxValue}
              onChange={onSelectedValueMax}
          ></input>
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
          <tr className={'thead-light'}>
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
  </Container>;

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
            <Button type="button" onClick={() => setHelperPage(true)} className="btn btn-lg d-inline pl-3">
              Helper
            </Button>
            <Button type="button" onClick={() => setHelperPage(false)} className="btn btn-lg d-inline pl-3 ml-2">
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

      {ShowHelper ? <PostTable />: null}
      {!ShowHelper ? <Helper_table />: null}

      <hr></hr>
      <footer>Created by Tianhao Qu, Kaiwen Tian</footer>
    </main>
  );
}

export default Main;
