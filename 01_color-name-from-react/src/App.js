import React from "react";
import colorList from "./colorList.json";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "nameAsc", //name,color
      list: colorList,
      columnCount: 1
    };
    this.nameSortClick = this.nameSortClick.bind(this);
    this.colorSortClick = this.colorSortClick.bind(this);
    this.columnCountClick = this.columnCountClick.bind(this);
  }

  columnCountClick(e) {
    this.setState({ columnCount: e.target.value });
  }
  sortStateSet(sort) {
    let tmp = colorList.slice();
    tmp.sort((a, b) => a.name < b.name);

    let _colors = this.state.list.slice();
    switch (sort) {
      case "nameAsc":
        _colors.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        break;
      case "nameDesc":
        _colors.sort((b, a) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        break;
      case "color":
        break;
      default:
        break;
    }
    this.setState({ sort: sort });
    this.setState({ list: _colors });
  }
  nameSortClick() {
    const sort = this.state.sort === "nameAsc" ? "nameDesc" : "nameAsc";
    this.sortStateSet(sort);
  }
  colorSortClick() {
    this.sortStateSet("color");
  }
  render() {
    return (
      <div className="App" style={{ columnCount: this.state.columnCount }}>
        {this.state.sort}
        <br />
        {this.state.columnCount}
        <h1>{colorList.length}colors</h1>
        <label for="columnInput">Number of columns</label>
        <input
          type="number"
          step="1"
          min="1"
          max="10"
          style={{ width: "3em" }}
          name="columnINput"
          value={this.state.columnCount}
          onChange={this.columnCountClick}
        />
        <br />
        sort: <button onClick={this.nameSortClick}>name</button>
        {/* , <a href="#" onClick={this.colorSortClick}>color</a> */}
        {this.state.list.map((el, idx) => (
          <div key={idx} style={{ backgroundColor: el.name, width: "200px" }}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
