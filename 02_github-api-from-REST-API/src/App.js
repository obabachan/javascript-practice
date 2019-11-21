import React from "react";
import "./App.css";

const axios = require("axios");

function App() {
  const instance = axios.create({
    method: "get",
    baseURL: "https://api.github.com/",
    timeout: 4000,
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  instance
    .get("/search/repositories", {
      params: {
        q: "stars:>1000",
        sort: "stars",
        per_page: 100,
      },
    })
    .then(results => console.log(results));
  return <div className="App">test</div>;
}

export default App;
