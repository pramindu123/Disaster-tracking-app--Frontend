import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alerts from "./pages/Alerts";
import SubmitSymptoms from "./pages/SubmitSymptoms";
import RequestAid from "./pages/RequestAid";
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/submit-symptoms" element={<SubmitSymptoms />} />
        <Route path="/request-aid" element={<RequestAid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
