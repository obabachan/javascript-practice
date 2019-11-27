import React, { useState, useCallback } from "react";
import "./App.css";
import { Container, Header, Button, Table, Image, icon, Icon } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

const axios = require("axios");
const moment = require("moment");
moment().format();

function RankingList(props) {
  const fields = [
    {
      key: "repository / owner",
      value: el => (
        <Header as="h4" image>
          <Image src={el.owner.avatar_url} size="mini" />
          <Header.Content>
            <a href={el.html_url} target="_blank" rel="noopener noreferrer">
              {el.name}
            </a>{" "}
            <Header.Subheader>
              <a href={el.owner.html_url} target="_blank" rel="noopener noreferrer">
                {el.owner.login}
              </a>
            </Header.Subheader>
          </Header.Content>
        </Header>
      ),
    },
    // {
    //   key: "repository",
    //   value: el => (
    //     <a href={el.html_url} target="_blank" rel="noopener noreferrer">
    //       {el.name}
    //     </a>
    //   ),
    // },
    // {
    //   key: "owner",
    //   value: el => (
    //     <a href={el.owner.html_url} target="_blank" rel="noopener noreferrer">
    //       {el.owner.login}
    //     </a>
    //   ),
    // },
    { key: "stars", value: el => el.stargazers_count.toLocaleString() },
    { key: "discription", value: el => el.description },
    { key: "language", value: el => el.language },
    { key: "update_at", value: el => moment(el.updated_at).fromNow() },
    {
      key: "create_at",
      value: el => {
        const date = new Date(el.created_at);
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
      },
    },
    { key: "licence", value: el => el.license.key },
  ];
  const records =
    props.list.length &&
    props.list.map((el, idx) => (
      <Table.Row>
        {fields.map((col, idx) => (
          <Table.Cell singleLine={idx === 0}>{col.value(el)}</Table.Cell>
        ))}
      </Table.Row>
    ));

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {fields.map(el => (
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
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

function App() {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);

  instance.interceptors.request.use(
    function(config) {
      setLoading(true);
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function(response) {
      setLoading(false);
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  const listLoadButtonClick = () => {
    if (loading === false) {
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
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <Header as="h1" textAlign="center">
          <Icon name="star" />
          Github Top10 Ranking of number of stars
        </Header>
        {loading}
        <br />
        <Button onClick={listLoadButtonClick} positive={true} loading={loading}>
          load
        </Button>
        <br />
        <br />
        <RankingList list={list} />
      </Container>
    </div>
  );
}

export default App;
