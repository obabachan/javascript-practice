import React from 'react';
import colorList from "./colorList.json"

import './App.css';

colorList.sort((a, b) => a.name < b.name);
const test = 0;
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: "nameAsc",//name,color
      list: colorList,
    }
    this.nameSortClick = this.nameSortClick.bind(this);
    this.colorSortClick = this.colorSortClick.bind(this);
  }
  sortStateSet(sort) {

    let tmp = colorList.slice();
    tmp.sort((a, b) => a.name < b.name);

    let _colors = this.state.list.slice();
    switch (sort) {
      case "nameAsc":
        _colors.sort(
        (a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        break;
      case "nameDesc":
        _colors.sort(
          (b, a) => {
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
    const sort = this.state.sort==="nameAsc"?"nameDesc":"nameAsc"
    this.sortStateSet(sort)
  }
  colorSortClick() {
    this.sortStateSet("color")
  }
  render() {
    return (
      <div className="App">

        {this.state.sort}
        <h1>{colorList.length}colors</h1>
        sort: <a href="#" onClick={this.nameSortClick}>name</a>
        {/* , <a href="#" onClick={this.colorSortClick}>color</a> */}
        {this.state.list.map((el, idx) => <div key={idx} style={{ backgroundColor: el.name }}>{el.name}</div>)}
      </div>
    );
  }
}

export default App;
