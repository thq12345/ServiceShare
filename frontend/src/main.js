import React, { useState } from "react";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

function Main() {
    return(
        <main class="container-fluid">
            <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
                <div class="container-fluid">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="./index.html"
                            >Home</a
                            >
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {/*<a href="#">Right</a>*/}
                    <li><Button variant="secondary" className="d-flex btn me-auto">
                        <a className="text-dark" href="login.html" target="_blank">
                            <h3>Personal Profile</h3>
                        </a>
                                    </Button></li>
                    </ul>
                </div>
            </nav>

            <div id="outer-header">
                <div class = "tag">
                    <span>
                        <h2 class="d-inline"> I am a:   </h2>
                        <Button type="button" class="btn btn-lg d-inline pl-3">Helper</Button>
                        <Button type="button" class="btn btn-lg d-inline pl-3 ml-2">Helper Seeker</Button>
                    </span>
                    {/*<Label>Enter your 5 digits ZIP Code</Label>*/}
                    <h4 class="pt-3">Enter your 5 digits ZIP Code:</h4>
                    <div>
                        <input class="d-inline-block ml-5" type="text" pattern="[0-9]{5}" title="Five digit zip code" />
                        <Button  variant="secondary" class="btn btn-secondary d-inline-block ml-2" type="submit" value="Submit">Go</Button>
                    </div>
                </div>
            </div>

            <Container fluid class = "pt-5 container-fluid mt-4" id="table">
                <Row>
                    <Col sm={3}>
                        <div className="dropdown pt-3 pl-4">
                            <Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Task Category
                            </Button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">House Cleaning</a>
                                <a className="dropdown-item" href="#">Pet Care</a>
                                <a className="dropdown-item" href="#">Furniture Move</a>
                            </div>
                        </div>
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
                                <input type="text" className="form-control" value="2012-04-05"></input>
                                <div className="input-group-addon">to</div>
                                <input type="text" className="form-control" value="2012-04-19"></input>
                            </div>
                        </div>

                    </Col>
                    <Col sm={9} >
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Task Short Description</th>
                                <th>Zip code</th>
                                <th>Category</th>
                                <th>Ideal Price/hr</th>
                                <th>Date for task</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            <tr>
                                <th>Cleaning my living room</th>
                                <th>02138</th>
                                <th>House Cleaning</th>
                                <th>30</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Dog Walking</th>
                                <th>02138</th>
                                <th>Pet Care</th>
                                <th>20</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            <tr>
                                <th>Cleaning my living room</th>
                                <th>02138</th>
                                <th>House Cleaning</th>
                                <th>30</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Dog Walking</th>
                                <th>02138</th>
                                <th>Pet Care</th>
                                <th>20</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            <tr>
                                <th>Cleaning my living room</th>
                                <th>02138</th>
                                <th>House Cleaning</th>
                                <th>30</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Dog Walking</th>
                                <th>02138</th>
                                <th>Pet Care</th>
                                <th>20</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            <tr>
                                <th>Cleaning my living room</th>
                                <th>02138</th>
                                <th>House Cleaning</th>
                                <th>30</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Dog Walking</th>
                                <th>02138</th>
                                <th>Pet Care</th>
                                <th>20</th>
                                <th>November 30th, 2021</th>
                            </tr>
                            <tr>
                                <th>Looking for something to move my TV</th>
                                <th>02118</th>
                                <th>Furniture Moving</th>
                                <th>25</th>
                                <th>December 24th, 2021</th>
                            </tr>
                            </tbody>
                        </table></Col>
                </Row>

            </Container>

            <hr></hr>
                <footer>Created by Tianhao Qu, Kaiwen Tian</footer>
        </main>
            );
}

export default Main;
