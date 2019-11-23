import React, { useState, useCallback } from "react";
import "./App.css";
import { Container, Header, Button, Table } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

const axios = require("axios");

function RankingList(props) {
  const columns = [
    { key: "icon", value: el => <img src={el.owner.avatar_url} width="30px" /> },
    {
      key: "repository",
      value: el => (
        <a href={el.html_url} target="_blank" rel="noopener noreferrer">
          {el.name}
        </a>
      ),
    },
    {
      key: "owner",
      value: el => (
        <a href={el.owner.html_url} target="_blank" rel="noopener noreferrer">
          {el.owner.login}
        </a>
      ),
    },
    { key: "stars", value: el => el.stargazers_count },
    { key: "discription", value: el => el.description },
    { key: "create_at", value: el => el.created_at },
    { key: "update_at", value: el => el.updated_at },
    {
      key: "licence",
      value: el =>
        el.license.url ? (
          <a href={el.license.url} target="_blank" rel="noopener noreferrer">
            {el.license.name}
          </a>
        ) : (
          <span>{el.license.name}</span>
        ),
    },
  ];
  const records =
    props.list.length &&
    props.list.map((el, idx) => (
      <Table.Row>
        {columns.map(col => (
          <Table.Cell>{col.value(el)}</Table.Cell>
        ))}
      </Table.Row>
    ));

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {columns.map(el => (
              <Table.HeaderCell>{el.key}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>{records}</Table.Body>
      </Table>
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
      <Container>
        <Header as="h1" icon="favorite" content="Github Top10 Ranking of number of stars"></Header>
        {loading}
        <br />
        <Button onClick={listRoadButtonClick} positive={true}>
          road
        </Button>
        <RankingList list={list} />
      </Container>
    </div>
  );
}

export default App;
