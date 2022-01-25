import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import UpdateNote from "../components/UpdateNote";

//Allocates appropriate components to appropriate routes
export default (
  <Router>
    <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/display_note/:id' element={<UpdateNote/>}/>
    </Routes>
  </Router>
);