import "./App.css";
import Login from "./Account_Verification/login_page.js";
import CreateAccount from "./Account_Verification/create_account.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Posts/post_form.js";

//Router, basically you add components here.
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
