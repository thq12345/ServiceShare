import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import SeekHelpTable from "../Other Components/SeekHelpTable.js";
import Navbar from "./Navbar.js";
import Button from "react-bootstrap/Button";

function SeekHelpPage() {
  let [Offer, setOffer] = useState([]);
  let [MinValue, setMinValue] = useState(0);
  let [MaxValue, setMaxValue] = useState(10000);
  let [State_selected, setState_selected] = useState("Select States");
  let [Category_request_Select, SetCategory_request_Select] =
    useState("Select Category");
  let [Input_Zipcode, setZipCode] = useState("");
  let [SearchItem, setSearchItem] = useState("");
  let [SortPostAsc, setPostAsc] = useState(1);
  let textMinInput = useRef(0);
  let textMaxInput = useRef(100000);
  let zipInput = useRef("");
  let searchInput = useRef("");
  let [login, setLogin] = useState(false);
  let [loginUsername, setLoginUsername] = useState("");

  const States = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const categoryOptions = [
    "Chore",
    "Academic",
    "Cleaning",
    "House Handy Work",
    "Baby Sitting",
    "Moving",
    "Pet Care",
    "Shopping",
  ];

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

    if (State_selected !== "Select States") {
      filtered_post = filtered_post.filter(
        (item) => item.State === State_selected
      );
    }

    //Price Range Filter
    filtered_post = filtered_post.filter(
      (item) =>
        item["Ideal Price"] <= MaxValue && item["Ideal Price"] >= MinValue
    );

    return filtered_post;
  }

  //fetch data (Offer Help)
  useEffect(() => {
    async function run() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      console.log("Login Status is:", loginStatus.user);
      if (loginStatus.user !== undefined) {
        setLogin(true);
        setLoginUsername(loginStatus.user);
      } else {
        setLogin(false);
        setLoginUsername("");
      }
    }

    async function run2() {
      let raw = await fetch(`api/load-all-helpers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bol: SortPostAsc,
        }),
      });
      let res = await raw.json();
      let postTemp = [];
      for (const element of res) {
        // categoryTemp.push(element.Category);
        postTemp.push(element);
      }
      setOffer(postTemp);
    }
    run().catch(console.dir);
    run2().catch(console.dir);
  }, [Category_request_Select, SortPostAsc]);

  //all filter components (For the sake of clarity)
  function FilterComponentSeekHelp() {
    return (
      <Col sm={3}>
        <div className={"mt-1"}>
          <label htmlFor={"searchbar"} className={"d-inline-block"}></label>
          <input
            className="d-inline-block"
            type="text"
            id={"searchbar"}
            ref={searchInput}
            placeholder={"Search here"}
          />
          <Button
            variant="secondary"
            className="btn btn-secondary d-inline-block ml-2"
            onClick={onSearchHandler}
          >
            Search
          </Button>
        </div>
  
  // MICHAEL CHANG 👉 TIANHAO QU - CODE REVIEW
  // Cool use of aria-label for accessability. Was reading more into this because of your usage and I think it may be possible to use a aria-labelledby attribute.
  // Example #3 or #7 to group selections/filters the users are looking for. Great job!
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute#examples
        <div className={"mt-1"}>
          <select
            className={"moredetailbutton"}
            aria-label="category"
            value={Category_request_Select}
            onChange={(e) => {
              SetCategory_request_Select(e.target.value);
            }}
          >
            <option key="all" value="Select Category">
              Select Category
            </option>
            {categoryOptions.map((p, i) => (
              <option key={"categoryoption" + i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className={"mt-1"}>
          <select
            className="moredetailbutton"
            aria-label={"state1"}
            value={State_selected}
            onChange={(e) => {
              setState_selected(e.target.value);
            }}
          >
            <option key="all" value="Select States">
              Select States
            </option>
            {States.map((p, i) => (
              <option key={"state" + i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className={"mt-1"}>
          <label className={"font-weight-bold"} htmlFor="textmininput">
            Minimum Ideal Price($):
          </label>

          <input
            type="number"
            className={"ml-2 rounded"}
            id="textmininput"
            ref={textMinInput}
            placeholder={textMinInput.current.value}
          />
          <br />
          <label className={"font-weight-bold"} htmlFor="textmaxinput">
            Maximum Ideal Price($):
          </label>
          <input
            type="number"
            className={"ml-2 rounded"}
            id="textmaxinput"
            ref={textMaxInput}
            placeholder={textMaxInput.current.value}
          />

          <div className="pt-1">
            <button
              type="button"
              className={"moredetailbutton"}
              onClick={onClickHandler}
            >
              Apply Price Range
            </button>
          </div>
        </div>
        <div className="mt-1">
          <h3
            className={"font-weight-bold d-inline-block mr-2"}
            style={{ fontSize: "20px" }}
          >
            Sort Prices:{" "}
          </h3>
          <button
            type="button"
            className={"sort_button d-inline-block mr-2"}
            onClick={() => setPostAsc(-1)}
          >
            &#11014;
          </button>
          <button
            type="button"
            className={"sort_button d-inline-block"}
            onClick={() => setPostAsc(1)}
          >
            &#11015;
          </button>
        </div>
      </Col>
    );
  }

  //the seek request tables with all requests (Seek Help)
  function OfferTableMain() {
    let datatemp = filter_on_post(Offer, Category_request_Select);
    console.log("posting seeks");
    console.log(datatemp);

    return (
      <Container fluid className="mt-5 table">
        <Row>
          <FilterComponentSeekHelp />
          <Col sm={9}>
            <SeekHelpTable
              data={datatemp}
              totalPosts={datatemp.length}
              loginStatus={login}
              loginUsername={loginUsername}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <Navbar login={login} />
        <br />
        <h1>Help Offers</h1>
        <h2 style={{ fontSize: "25px" }}>
          If you have time to help someone (while making some money as well),
          then this is the right place for you!
        </h2>
        <OfferTableMain />
      </div>
    </>
  );
}

export default SeekHelpPage;
