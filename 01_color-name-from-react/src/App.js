import React, { useState, useCallback } from "react";
import colorList from "./colorList.json";

import "./App.css";

function ColorNameList(props) {
  const rowsCount = Math.ceil(props.list.length / props.columnCount);
  return (
    <div
      className="color-list"
      style={{ gridTemplateRows: `repeat(${rowsCount}, auto)` }}
    >
      {props.list.map((el, idx) => (
        <div key={idx} style={{ backgroundColor: el.name, width: "200px" }}>
          {el.name}
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
  }
  return _colors;
}

function App() {
  const [sortType, setSortType] = useState({ type: "name", asc: false });
  const [list, setList] = useState(colorList);
  const [columnCount, setColumn] = useState(1);

  const columnCountClick = useCallback(e => {
    setColumn(e.target.value);
  });

  const nameSortClick = useCallback(e => {
    setSortType({ type: e.target.value, asc: !sortType.asc });
    setList(sortList(sortType, list));
  });
  const colorSortClick = useCallback(() => {
    this.sortStateSet("color");
  });
  return (
    <div className="App">
      <div>
        {sortType.type}/ {sortType.asc.toString()}
        <br />
        {columnCount}
        <h1>{colorList.length}colors</h1>
        <label for="columnInput">Count of columns</label>
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
        sort:{" "}
        <button value="name" onClick={nameSortClick}>
          name
        </button>
      </div>
      <ColorNameList list={list} columnCount={columnCount} />
    </div>
  );
}

export default App;
