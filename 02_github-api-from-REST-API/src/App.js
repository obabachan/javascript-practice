import React, { useState, useCallback } from "react";
import "./App.css";

const axios = require("axios");

function RankingList(props) {
  const elements =
    props.list.length &&
    props.list.map((el, idx) => (
      <tr key={idx}>
        <td>
          <img src={el.owner.avatar_url} width="30px" />
        </td>
        <td>
          <a href={el.html_url} target="_blank">
            {el.name}
          </a>
        </td>
        <td>
          <a href={el.owner.html_url} target="_blank">
            {el.owner.login}
          </a>
        </td>
        <td>{el.stargazers_count}</td>
        <td>{el.description}</td>
        <td>{el.created_at}</td>
        <td>{el.updated_at}</td>
        <td>
          {el.license.url ? (
            <a href={el.license.url} target="_blank">
              {el.license.name}
            </a>
          ) : (
            <span>{el.license.name}</span>
          )}
        </td>
        <td></td>
      </tr>
    ));
  return (
    <div>
      {props.list.length && (
        <table>
          <thead>
            <tr>
              <td>icon</td>
              <td>repository</td>
              <td>owner</td>
              <td>stars</td>
              <td>discription</td>
              <td>create_at</td>
              <td>update_at</td>
              <td>licence</td>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </table>
      )}
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

  instance.interceptors.request.use(
    function(config) {
      setLoading("loading");
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function(response) {
      setLoading("finish");
      return response;
    },
    function(error) {
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
          per_page: 10,
        },
      })
      .then(results => {
        console.log(results);
        setList(results.data.items);
      });
  };

  return (
    <div className="App">
      <h1>Github Top10 Ranking of number of stars</h1>
      {loading}
      <br />
      <button onClick={listRoadButtonClick}>road</button>
      <RankingList list={list} />
    </div>
  );
}

export default App;
