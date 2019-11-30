import React, { useState, useCallback } from "react";
import "./App.css";
import { Container, Header, Button, Table, Image, Icon, Message, Loader, Segment } from "semantic-ui-react";
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
        {fields.map((col, colx) => (
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

let isSet = false;

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

  if (!isSet) {
    instance.interceptors.request.use(
      function(config) {
        isSet = true;
        setLoading(true);
        setNotice({
          title: "Loading ...",
          text: ``,
          status: { warning: true },
        });
        console.log("request");

        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }
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
          const resetTime = moment.unix(results.headers["x-ratelimit-reset"]);
          const nowTime = moment();
          console.log(resetTime);
          console.log(resetTime.diff(nowTime, "seconds"));
          setNotice({
            title: "Success",
            text: `Displayed rank ${props.page.text}.`,
            status: { success: true },
            reset: {
              seconds: resetTime.diff(nowTime, "seconds"),
              count: results.headers["x-ratelimit-remaining"],
              total: results.headers["x-ratelimit-limit"],
            },
          });
          setList(results.data.items);
          setPage(props.page.page);
        })
        .catch(error => {
          console.log(error.response.status);
          console.log(error.response.headers);
          const resetTime = moment.unix(error.response.headers["x-ratelimit-reset"]);
          const nowTime = moment();

          console.log(resetTime);
          if (error.response && error.response.status === 403) {
            setNotice({
              title: "Error",
              text: `${error.response.status} error.\n Please try after a while.`,
              status: { error: true },
              reset: {
                seconds: resetTime.diff(nowTime, "seconds"),
                count: error.response.headers["x-ratelimit-remaining"],
                total: error.response.headers["x-ratelimit-limit"],
              },
            });
          } else {
            setNotice({ title: "Error", text: `${error.response.status} error.`, status: { error: true } });
          }
        })
        .finally(() => {
          setLoading(false);
          console.log("finally");
        });
    }
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <Message>
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
    </div>
  );
}

export default App;
