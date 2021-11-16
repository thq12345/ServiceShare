import "./App.css";
import Login from "./login_page.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./post_form.js";
import Main from "./main.js"

//Router, basically you add components here.
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
            <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
