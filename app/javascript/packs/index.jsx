import React from 'react'
import ReactDOM from 'react-dom'
import App from "../components/App";

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded");
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  )
})
