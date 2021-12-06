import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import SeekHelpTable from "./Other Components/SeekHelpTable.js";
import OfferHelpTable from "./Other Components/OfferHelpTable.js";
import { data } from "express-session/session/cookie";
import Login_modal from "./Account_Verification/loginmodal.js";
import Categories from "./Other Components/Category_request.js";

function Main() {

  let [Seeks, setSeeks] = useState([]);
  let [Posts, setPosts] = useState([]);
  // let [Category_request, setCategory_request] = useState([]);
  // let [Helpers, setHelpers] = useState([]);
  // let [Category_help, setCategory_help] = useState([]);
  let [MinValue, setMinValue] = useState(0);
  let [MaxValue, setMaxValue] = useState(10000);
  let [Category_help_Select, SetCategory_help_Select] =
    useState("Select Category");

  let [State_selected, setState_selected] =
      useState("Select States");

  let [Category_request_Select, SetCategory_request_Select] =
    useState("Select Category");
  let [ShowHelper, setHelperPage] = useState(false);
  let [Input_Zipcode, setZipCode] = useState("");
  let [SearchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  let [SortPostAsc, setPostSortAsc] = useState(1);
  let [SortHelperAsc, setHelperAsc] = useState(1);
  let textMinInput = useRef(0);
  let textMaxInput = useRef(100000);
  let zipInput = useRef("");
  let searchInput = useRef("");

  const States=['Alabama','Alaska','American Samoa',
    'Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','District of Columbia','Federated States of Micronesia',
    'Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts',
    'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
    'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota',
    'Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania',
    'Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee',
    'Texas','Utah','Vermont','Virgin Island','Virginia','Washington',
    'West Virginia','Wisconsin','Wyoming'];

  let onClickHandler = () => {
    setMinValue(parseInt(textMinInput.current.value));
    setMaxValue(parseInt(textMaxInput.current.value));
    setZipCode(zipInput.current.value);
    if (!textMinInput.current.value) {
      setMinValue(0);
    }
    if (!textMaxInput.current.value) {
      setMaxValue(10000000);
    }
    if (!zipInput.current.value) {
      setZipCode("");
    }
  };
  //
  // let onClickPriceHandler = (e) => {
  //   setMinValue(parseInt(textMinInput.current.value));
  //   setMaxValue(parseInt(textMaxInput.current.value));
  //   if(!textMinInput.current.value) {
  //     setMinValue(0);
  //   }
  //   if(!textMaxInput.current.value){
  //     setMaxValue(10000000);
  //   }
  // };

  let onSearchHandler = () => {
    setSearchItem(searchInput.current.value);
    if (!searchInput.current.value) {
      setSearchItem("");
    }
  };

  //filter on the posts board on the request and helper table
  function filter_on_post(post, select) {
    let filtered_post = post;
    //Category Filter
    if (select === "Select Category" && Input_Zipcode != null) {
      filtered_post = post;
    }
    if (Input_Zipcode !== "") {
      filtered_post = filtered_post.filter((item) =>
        item["Zip Code"].toString().includes(Input_Zipcode)
      );
    }
    if (SearchItem !== "") {
      filtered_post = filtered_post.filter((item) =>
        item.Description.includes(SearchItem)
      );
    }
    if (select !== "Select Category") {
      filtered_post = filtered_post.filter((item) => item.Category === select);
    }

    if (State_selected != "Select States"){
      filtered_post = filtered_post.filter((item) => item.State === State_selected);
    }

    //Price Range Filter
    filtered_post = filtered_post.filter(
      (item) =>
        item["Ideal Price"] <= MaxValue && item["Ideal Price"] >= MinValue
    );

    return filtered_post;
  }

  //fetch data (Seek Help)
  useEffect(() => {
    async function runThis() {
      let raw = await fetch(`api/load-all-helpers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bol: SortPostAsc,
        }),
      });
      let res = await raw.json();
      let categoryTemp = [];
      let postTemp = [];
      for (const element of res) {
        categoryTemp.push(element.Category);
        postTemp.push(element);
      }
      // //remove duplicate category options.
      // categoryTemp = categoryTemp.filter(function (item, pos) {
      //   return categoryTemp.indexOf(item) === pos;
      // });
      // //load all distinct category into the dropdown bar
      // setCategory_request(categoryTemp);
      setPosts(postTemp.slice(0, 250));
    }
    runThis().catch(console.dir);
  }, [Category_request_Select,SortPostAsc]);

  //fetch data (Offer Help)
  useEffect(() => {
    async function runThis() {
      let raw = await fetch(`api/load-seeks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bol: SortHelperAsc,
        }),
      });
      let res = await raw.json();
      let categoryOffers = [];
      let postTemp = [];
      for (const element of res) {
        // categoryOffers.push(element.Category);
        postTemp.push(element);
      }
      // //remove duplicate category options.
      // categoryOffers = categoryOffers.filter(function (item, pos) {
      //   return categoryOffers.indexOf(item) === pos;
      // });
      // //load all distinct category into the dropdown bar
      // setCategory_help(categoryOffers);
      // setHelpers(postTemp);
      setSeeks(postTemp);
    }
    runThis().catch(console.dir);
  }, [Category_help_Select,SortHelperAsc]);

  //all filter components (For the sake of clarity)
  function FilterComponentSeekHelp() {
    return (
      <Col sm={3}>
        <select
            id="category"
            aria-label="category"
            value={Category_request_Select}
            onChange={(e) => {
              SetCategory_request_Select(e.target.value);
            }}
        >
          <Categories></Categories>
        </select>
        <br/>
        <select
            className="category mt-2"
            value={States}
            onChange={(e) => {
              setState_selected(e.target.value);
            }}
        >
          <option key="all" value="Select States">
            Select States
          </option>
          {States.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
          ))}
        </select>
        {/*<div className="pt-3">*/}
        {/*  /!*<p>Zip Code:</p>*!/*/}
        {/*  <label htmlFor="zipinput">Zip Code: </label>*/}
        {/*  <br />*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    id="zipinput"*/}
        {/*    ref={zipInput}*/}
        {/*    placeholder={zipInput.current.value}*/}
        {/*  />*/}
          <br />
          <label htmlFor="textmininput">Minimum Ideal Price($):</label>
          <br />
          {/*<p>Minimum Ideal Price($):</p>*/}
          <input
            type="number"
            id="textmininput"
            ref={textMinInput}
            type="number"
            placeholder={textMinInput.current.value}
          />
          <br />
          <label htmlFor="textmaxinput">Maximum Ideal Price($):</label>
          <br />
          <input
            type="number"
            id="textmaxinput"
            ref={textMaxInput}
            type="number"
            placeholder={textMaxInput.current.value}
          />

        <div className="pt-1">
          <Button type="button" onClick={onClickHandler}>
            Apply Price Range
          </Button>
        </div>

        <div className="pt-1">
          <Button variant="outline-info" type="button" onClick={() => setHelperAsc(1)}>Sort price: Ascending &#11014;</Button>
          <Button variant="outline-info" type="button" onClick={() => setHelperAsc(-1)}>Sort price: Descending &#11015;</Button>
        </div>

      </Col>
    );
  }
  function FilterComponentOfferTable() {
    return (
      <Col sm={3}>
        <select
            id="category"
            aria-label="category"
            value={Category_help_Select}
            onChange={(e) => {
              SetCategory_help_Select(e.target.value);
            }}
        >
          <Categories></Categories>
        </select>

        <select
            value={States}
            className="category mt-2"
            onChange={(e) => {
              setState_selected(e.target.value);
            }}
        >
          <option key="all" value="Select States">
            Select States
          </option>
          {States.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
          ))}
        </select>
          <br />
          <label htmlFor={"minidealpricehelper"}>Minimum Ideal Price($)</label>
          <br />
          <input
            type="number"
            id={"minidealpricehelper"}
            ref={textMinInput}
            placeholder={textMinInput.current.value}
          />
          <br />
          <label htmlFor={"maxidealpricehelper"}>Maximum Ideal Price($)</label>
          <br />
          <input
            type="number"
            id={"maxidealpricehelper"}
            ref={textMaxInput}
            placeholder={textMaxInput.current.value}
          />
          <br />
        <div className="pt-1">
          <Button type="button" onClick={onClickHandler}>
            Apply Price Range
          </Button>
        </div>
        <div className="pt-3">
          <Button variant="outline-info" type="button" onClick={() => setHelperAsc(1)}>Sort price: Ascending &#11014;</Button>
          <Button variant="outline-info" type="button" onClick={() => setHelperAsc(-1)}>Sort price: Descending &#11015;</Button>
        </div>
      </Col>
    );
  }

  //the helper tables with all the offers (Offer help)
  function OfferTableMain() {
    let HelperFiltered = filter_on_post(Seeks, Category_help_Select).slice(0,250);
    return (
      <Container fluid className={"mt-5 table"}>
        <Row>
          <FilterComponentOfferTable />
          <Col sm={9}>
            <OfferHelpTable
              data={HelperFiltered}
              totalPosts={HelperFiltered.length}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  //the seek request tables with all requests (Seek Help)
  function SeekHelpTableMain() {

    let datatemp = filter_on_post(Seeks, Category_request_Select).slice(0,250);
    console.log('posting seeks');
    console.log(datatemp);

    return (
      <Container fluid className="mt-5 table">
        <Row>
          <FilterComponentSeekHelp />
          <Col sm={8}>
            <SeekHelpTable data={datatemp} totalPosts={datatemp.length} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <nav
          className="navbar navbar-expand-md navbar-light bg-light sticky-top"
          aria-label={"navbar"}
        >
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
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Login_modal></Login_modal>
              </li>
              <li>

                <Button
                  variant="secondary"
                  className="d-flex btn me-auto"
                  onClick={() => navigate("/login")}
                >
                  <h3>Log in</h3>
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
              <h1 className="d-inline" style={{ fontSize: "30px" }}>
                {" "}
                I am here to...{" "}
              </h1>
              <button
                type="button"
                onClick={() => setHelperPage(true)}
                className="stands-out-button"
              >
                Seek Help
              </button>
              <button
                type="button"
                onClick={() => setHelperPage(false)}
                className="stands-out-button"
              >
                Offer Help
              </button>
            </span>

            <div>
              {/*<input className="d-inline-block ml-5" title="Search Bar" />*/}
              <label htmlFor={"searchbar"} className={"pt-3 d-inline-block"}>
                Search Bar
              </label>
              <input
                className="d-inline-block ml-5"
                type="text"
                title="Search Bar"
                id={"searchbar"}
                ref={searchInput}
                placeholder={searchInput.current.value}
              />
              <Button
                variant="secondary"
                className="btn btn-secondary d-inline-block ml-2"
                onClick={onSearchHandler}
              >
                Search
              </Button>
            </div>
            </div>
        </div>
        {!ShowHelper ? <SeekHelpTableMain /> : null}
        {ShowHelper ? <OfferTableMain /> : null}
      </div>
      <footer>Created by Tianhao Qu, Kaiwen Tian</footer>
    </>
  );
}

export default Main;
