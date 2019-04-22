import React, { Component } from 'react'

import Chart from "./components/Chart"

import imageLoaderService from "./services/ImageLoaderService"
import dataLoaderService from "./services/DataLoaderService"

import './App.css'
import BarChart from './components/BarChart';

class App extends Component {
  constructor(props) {
    super(props)

    this.chart = React.createRef()
    // imageLoaderService.load()
    // dataLoaderService.load("data.json").then(data => this.chart.current.setState({data}))
  }

  render() {
    return (
      <div className="app">
        {/* <Chart id="orgChart" ref={this.chart}/> */}
        <BarChart data={[5,10,1,3]} size={[640,480]}/>
      </div>
    );
  }
}

export default App;
