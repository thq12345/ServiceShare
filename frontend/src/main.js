import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import MoreDetails from "./Other Components/MoreDetailsMainPage.js";
import logo from "./images/logo.png";
function Main() {
  let [Posts, setPosts] = useState([]);
  let [Category_request, setCategory_request] = useState([]);
  let [Helpers, setHelpers] = useState([]);
  let [Category_help, setCategory_help] = useState([]);
  let [MinValue, setMinValue] = useState(0);
  let [MaxValue, setMaxValue] = useState(10000);
  let [Category_help_Select, SetCategory_help_Select] =
    useState("Select Category");
  let [Category_request_Select, SetCategory_request_Select] =
    useState("Select Category");
  let [ShowHelper, setHelperPage] = useState(false);
  let [Input_Zipcode, setZipCode] = useState("");
  const navigate = useNavigate();

  let textMinInput = useRef(0);
  let textMaxInput = useRef(100000);

  let onClickHandler = () => {
    setMinValue(parseInt(textMinInput.current.value));
    setMaxValue(parseInt(textMaxInput.current.value));
    if (!textMinInput.current.value) {
      setMinValue(0);
    }
    if (!textMaxInput.current.value) {
      setMaxValue(10000000);
    }
  };

  //filter on the posts board on the request and helper table
  function filter_on_post(post, select) {
    let filtered_post = post;
    //Category Filter
    if (select === "Select Category" && Input_Zipcode != null) {
      filtered_post = post;
      console.log(1);
    }
    if (Input_Zipcode !== "") {
      filtered_post = filtered_post.filter((item) =>
        item["Zip Code"].toString().includes(Input_Zipcode)
      );
      console.log(2);
    }
    if (select !== "Select Category") {
      filtered_post = filtered_post.filter((item) => item.Category === select);
      console.log(select);
      console.log(3);
    }
    //Price Range Filter
    filtered_post = filtered_post.filter(
      (item) =>
        item["Ideal Price"] <= MaxValue && item["Ideal Price"] >= MinValue
    );
    return filtered_post;
  }
  //fetch all requests
  useEffect(() => {
    async function runThis() {
      let raw = await fetch(
        `api/load-all-post?category=${Category_request_Select}`
      );
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
      setCategory_request(categoryTemp);
      setPosts(postTemp);
    }
    runThis().catch(console.dir);
  }, [Category_request_Select]);
  //filter all the helpers offer
  useEffect(() => {
    async function runThis() {
      let raw = await fetch(`api/load-helpers`);
      let res = await raw.json();
      let categoryOffers = [];
      let postTemp = [];
      for (const element of res) {
        categoryOffers.push(element.Category);
        postTemp.push(element);
      }
      //remove duplicate category options.
      categoryOffers = categoryOffers.filter(function (item, pos) {
        return categoryOffers.indexOf(item) === pos;
      });
      //load all distinct category into the dropdown bar
      setCategory_help(categoryOffers);
      setHelpers(postTemp);
    }
    runThis().catch(console.dir);
  }, [Category_help_Select]);
  //the helper tables with all the offers
  function HelperTable() {
    let HelperFiltered = filter_on_post(Helpers, Category_help_Select);
    const rows = [...Array(Math.ceil(HelperFiltered.length / 4))];
    const productRows = rows.map((row, idx) =>
      HelperFiltered.slice(idx * 4, idx * 4 + 4)
    );
    // Xuejia Yang: The card size is not fixed, maybe fix it to 4 cards each line?
    const content = productRows.map((row, idx) => (
      <div className="row m-3e" key={idx}>
        {row.map((h, i) => (
          <Col key={"card" + i} className="card">
            <div key={"card-body" + i} className="card-body">
              <h5 key={"card-title" + i} className="card-title">
                {h.Category}
              </h5>
              <p key={"card-text" + i} className="card-text">
                {h.Description}
              </p>
              <MoreDetails json={h} />
            </div>
          </Col>
        ))}
      </div>
    ));
    return (
      <Container fluid className={"mt-5 table"}>
        <Row>
          <Col sm={3}>
            <select
              id="category"
              value={Category_help_Select}
              onChange={(e) => {
                SetCategory_help_Select(e.target.value);
              }}
            >
              <option key="all" value="Select Category">
                Select Category
              </option>
              {Category_help.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="pt-3">
              <p>Minimum Ideal Price($):</p>
              <input
                type="number"
                ref={textMinInput}
                placeholder={textMinInput.current.value}
              ></input>
            </div>
            <div className={"pt-1"}>
              <p>Maximum Ideal Price($):</p>
              <input
                type="number"
                ref={textMaxInput}
                placeholder={textMaxInput.current.value}
              ></input>
            </div>
            <div className="pt-3">
              <Button type="button" onClick={onClickHandler}>
                Apply Price Filter
              </Button>
            </div>
          </Col>
          <Col sm={9}>{content}</Col>
        </Row>
      </Container>
    );
  }
  //the seek request tables with all requests
  let PostTable = () => (
    <Container fluid className="pt-5 container-fluid mt-5 table">
      <Row>
        <Col sm={3}>
          <select
            id="category"
            value={Category_request_Select}
            onChange={(e) => {
              SetCategory_request_Select(e.target.value);
            }}
          >
            <option key="all" value="Select Category">
              Select Category
            </option>
            {Category_request.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="pt-3">
            <p>Minimum Ideal Price($):</p>
            <input
              type="number"
              ref={textMinInput}
              placeholder={textMinInput.current.value}
            ></input>
          </div>
          <div className={"pt-1"}>
            <p>Maximum Ideal Price($):</p>
            <input
              type="number"
              ref={textMaxInput}
              placeholder={textMaxInput.current.value}
            ></input>
          </div>
          <div className="pt-3">
            <Button type="button" onClick={onClickHandler}>
              Apply Price Filter
            </Button>
          </div>
        </Col>
        <Col sm={8}>
          <table className="table">
            <tbody>
              <tr className={"thead-light"}>
                <th>Category</th>
                <th>Task Short Description</th>
                <th>Ideal Price/hr</th>
                <th>Date for task</th>
                {/*<th>Address</th>*/}
                <th>More details</th>
              </tr>
              {filter_on_post(Posts, Category_request_Select).map((p, i) => (
                <tr key={i}>
                  <th>{p.Category}</th>
                  <th>{p.Description}</th>
                  {/*<th>{p["Zip Code"]}</th>*/}
                  <th>{p["Ideal Price"]}</th>
                  <th>{p["Date for task"]}</th>
                  {/*<th>{p.Address}</th>*/}
                  <td>
                    <MoreDetails json={p} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
  return (
    <main className="container-fluid">
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
      <div
        className="d-flex justify-content-center align-content-end"
        id="outer-header"
      >
        <div className="tag">
          <span>
            <h2 className="d-inline"> I am here to... </h2>
            <Button
              type="button"
              onClick={() => setHelperPage(true)}
              className="btn btn-lg d-inline pl-3"
            >
              Seek Help
            </Button>
            <Button
              type="button"
              onClick={() => setHelperPage(false)}
              className="btn btn-lg d-inline pl-3 ml-2"
            >
              Offer Help
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
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
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
      {ShowHelper ? <PostTable /> : null}
      {!ShowHelper ? <HelperTable /> : null}
      <hr></hr>
      <footer>Created by Tianhao Qu, Kaiwen Tian</footer>
    </main>
  );
}
export default Main;
