import React, { useState, useCallback } from "react";
import colorList from "./colorList.json";

import "./App.css";

// colorList init
colorList.forEach((el, idx, arr) => {
  let [_, r, g, b] = el.hex.match(/^#(.{2})(.{2})(.{2})$/);
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  arr[idx]["brightness"] = Math.sqrt(r ** 2 * 0.241 + g ** 2 * 0.691 + b ** 2 * 0.068);
  arr[idx]["opposite"] = `rgb(${255 - r},${255 - g},${255 - b})`;
});

function ColorNameList(props) {
  const rowsCount = Math.ceil(props.list.length / props.columnCount);
  const order =
    props.order === "columns"
      ? {
          gridTemplateRows: `repeat(${rowsCount}, auto)`,
          gridAutoFlow: "column",
        }
      : props.order === "rows"
      ? {
          gridTemplateColumns: `repeat(${props.columnCount}, auto)`,
        }
      : "";

  return (
    <div className="color-list" style={order}>
      {props.list.map((el, idx) => (
        <div key={idx} style={{ backgroundColor: el.name, width: "200px" }}>
          <p
            style={
              props.fontColor === "opposite"
                ? { color: el.opposite }
                : el.brightness > 130
                ? { color: "black" }
                : { color: "white" }
            }
          >
            {el.name}
          </p>
        </div>
      ))}
    </div>
  );
}

function sortList(sortType, list) {
  let _colors = list.slice();
  switch (sortType.type) {
    case "name":
      if (sortType.asc === true) {
        _colors.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else {
        _colors.sort((b, a) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      }
      break;

    case "brightness":
      if (sortType.asc === true) {
        _colors.sort((a, b) => b.brightness - a.brightness);
      } else {
        _colors.sort((a, b) => a.brightness - b.brightness);
      }
      break;
  }
  return _colors;
}

function App() {
  const [sortType, setSortType] = useState({ type: "name", asc: false });
  const [list, setList] = useState(colorList);
  const [columnCount, setColumn] = useState(3);
  const [order, setOrder] = useState("columns");
  const [fontColor, setFontColor] = useState("black");

  const columnCountClick = useCallback(e => {
    setColumn(e.target.value);
  });

  const sortTypeClick = useCallback(e => {
    setSortType({ type: e.target.value, asc: !sortType.asc });
    setList(sortList({ type: e.target.value, asc: !sortType.asc }, list));
  });

  const orderClick = useCallback(e => {
    setOrder(e.target.value);
  });

  const fontColorClick = useCallback(e => {
    setFontColor(e.target.value);
  });

  return (
    <div className="App">
      <div>
        {sortType.type}/ {sortType.asc.toString()}
        <br />
        {columnCount}
        <br />
        {order}
        <br />
        {fontColor}
        <h1>{colorList.length}colors</h1>
        <label for="columnInput">Count of columns:</label>
        <input
          type="number"
          step="1"
          min="1"
          max="10"
          style={{ width: "3em" }}
          name="columnINput"
          value={columnCount}
          onChange={columnCountClick}
        />
        <br />
        <div>
          Sort by:
          <button value="name" onClick={sortTypeClick}>
            name
          </button>
          <button value="brightness" onClick={sortTypeClick}>
            brightness
          </button>
        </div>
        <div>
          Order of:
          <button value="columns" onClick={orderClick}>
            columns
          </button>
          <button value="rows" onClick={orderClick}>
            rows
          </button>
        </div>
        <div>
          Font color:
          <button value="black" onClick={fontColorClick}>
            black and white
          </button>
          <button value="opposite" onClick={fontColorClick}>
            opposite
          </button>
        </div>
      </div>
      <ColorNameList list={list} columnCount={columnCount} order={order} fontColor={fontColor} />
    </div>
  );
}

export default App;
