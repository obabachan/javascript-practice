import React, { useState, useCallback } from "react";
import "./App.css";

const axios = require("axios");

function RankingList(props) {
  return (
    <div>
      {props.list.length &&
        props.list.map((el, idx) => (
          <div key={idx}>
            <p>{el.name}</p>
          </div>
        ))}
    </div>
  );
}

const instance = axios.create({
  method: "get",
  baseURL: "https://api.github.com/",
  timeout: 4000,
  headers: { Accept: "application/vnd.github.v3+json" },
});

function App() {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState("empty");

  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      setLoading("loading");
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setLoading("finish");

      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  const listRoadButtonClick2 = () => {};

  const listRoadButtonClick = () => {
    instance
      .get("/search/repositories", {
        params: {
          q: "stars:>1000",
          sort: "stars",
          per_page: 100,
        },
      })
      .then(results => {
        console.log(results);
        setList(results.data.items);
      });
  };

  return (
    <div className="App">
      {loading}
      <br />
      <button onClick={listRoadButtonClick}>road</button>
      <RankingList list={list} />
    </div>
  );
}

export default App;
