import "./App.css";
import Login from "./Account_Verification/login_page.js";
import CreateAccount from "./Account_Verification/create_account.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Posts/post_form.js";
import Main from "./main.js";
import Form2 from "./Posts/post_form_2.js";

//Router, basically you add components here.
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Main />} />
          <Route path="/form2" element={<Form2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
