import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Header, Button, Table, Image, Icon, Message, Loader, Segment, Item, Grid } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

const axios = require("axios");
const moment = require("moment");
moment().format();

const PER_PAGE = 100;

function RankingList(props) {
  const fields = [
    { key: "rank", value: (el, idx) => (props.page - 1) * PER_PAGE + idx, textAlign: "center" },
    {
      key: "repository / owner",
      value: el => (
        <Item.Group>
          <Item>
            <Item.Image as="img" size="mini" src={el.owner.avatar_url} />
            <Item.Content>
              <Item.Header as="a" href={el.html_url} target="_blank" rel="noopener noreferrer">
                {el.name}
              </Item.Header>
              <Item.Description>
                <a href={el.owner.html_url} target="_blank" rel="noopener noreferrer">
                  {el.owner.login}
                </a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      ),
      singleLine: true,
    },
    { key: "stars", value: el => el.stargazers_count.toLocaleString(), textAlign: "right" },
    { key: "discription", value: el => el.description },
    { key: "language", value: el => el.language, textAlign: "center" },
    { key: "update_at", value: el => moment(el.updated_at).fromNow(), textAlign: "right" },
    {
      key: "create_at",
      value: el => {
        const date = new Date(el.created_at);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
      textAlign: "right",
    },
    { key: "licence", value: el => el.license && el.license.key, textAlign: "center" },
  ];
  const records =
    props.list.length &&
    props.list.map((el, idx) => (
      <Table.Row>
        {fields.map(col => (
          <Table.Cell singleLine={col.singleLine ? true : false} textAlign={col.textAlign ? col.textAlign : "left"}>
            {col.value(el, idx + 1)}
          </Table.Cell>
        ))}
      </Table.Row>
    ));

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {fields.map(el => (
              <Table.HeaderCell textAlign="center">{el.key}</Table.HeaderCell>
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
  const [notice, setNotice] = useState({
    title: "Please, choose",
    text: "Select the rank you want to see.",
    reset: {},
    status: { warning: true },
  });
  const [page, setPage] = useState(0);

  const pages = [...Array(10).keys()].map(i => ({
    page: i + 1,
    text: `${i * PER_PAGE + 1} - ${i * PER_PAGE + PER_PAGE}`,
  }));

  useEffect(() => {
    instance.interceptors.request.use(
      function(config) {
        setLoading(true);
        setNotice({
          title: "Loading ...",
          text: "",
          status: { warning: true },
        });
        console.log("request");

        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }, []);

  const shapeReset = (resetTime, headers) => ({
    seconds: resetTime.diff(moment(), "seconds"),
    count: headers["x-ratelimit-remaining"],
    total: headers["x-ratelimit-limit"],
  });

  const listLoadButtonClick = async (e, props) => {
    if (loading === false) {
      instance
        .get("/search/repositories", {
          params: {
            q: "stars:>1000",
            sort: "stars",
            per_page: PER_PAGE,
            page: props.page.page,
          },
        })
        .then(results => {
          console.log(results);
          setNotice({
            title: "Success",
            text: `Displayed rank ${props.page.text}.`,
            status: { success: true },
            reset: shapeReset(moment.unix(results.headers["x-ratelimit-reset"]), results.headers),
          });
          setList(results.data.items);
          setPage(props.page.page);
        })
        .catch(error => {
          let errorText = "error.";
          if (error.response && error.response.status === 403) {
            errorText = errorText + "\n Please try after a while.";
          }
          const tmpError = error.response || error.request;
          setNotice({
            title: "Error",
            text: `${tmpError.status || "Unknown error"} ${errorText}`,
            status: { error: true },
            reset: shapeReset(moment.unix(error.response.headers["x-ratelimit-reset"]), error.response.headers),
          });
        })
        .finally(() => {
          setLoading(false);
          console.log("finally");
        });
    }
  };

  return (
    <Container textAlign="center">
      <Message style={{ marginTop: "20px" }}>
        <Header as="h1" textAlign="center">
          <Icon name="star" />
          Github Top1000 Ranking of number of stars
        </Header>
        * There is a rate limit of 10 times per minute.
      </Message>
      <Button.Group widths="10">
        {pages.map((el, idx) => (
          <Button page={el} onClick={listLoadButtonClick} active={page === idx + 1}>
            {el.text}
          </Button>
        ))}
      </Button.Group>

      <Message {...notice.status}>
        <Message.Content>
          <Message.Header>{notice.title}</Message.Header>
          {loading ? (
            <Loader active={true} />
          ) : (
            <p>
              <p>{notice.text}</p>
              {notice.reset.seconds && (
                <p>
                  (Limit release time {notice.reset.seconds} seconds ago. ratelimit-remaining {notice.reset.count}/
                  {notice.reset.total})
                </p>
              )}
            </p>
          )}
        </Message.Content>
      </Message>

      <RankingList list={list} page={page} />

      <Segment vertical></Segment>
      <Segment vertical>
        <div>
          <a
            href="https://github.com/obabachan/javascript-practice/tree/master/02_github-api-from-REST-API"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" size="large" />
          </a>
        </div>
      </Segment>
    </Container>
  );
}

export default App;
