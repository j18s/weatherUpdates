
import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  render() {
    return (
      <Table/>
    );
  };
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      city:''
    }
  }
  componentWillMount() {
    let url = "http://myweatherforecast.southindia.cloudapp.azure.com/weatherForecast";
    axios.get(url)
      .then(res => {
        const resData = res.data;
        this.setState({
          result: resData.list,
          city: resData.city.name
        });
      });
  };
  render() {
    return (
      <div>
        <span>Temperature of </span><span className="city">{this.state.city} </span><span>city</span><br/><br/>
        <table>
          <thead>
            {this.generateHeaderData() }
          </thead>
          <tbody>{this.generateBodyData() }</tbody>
        </table>
      </div>
    )
  }
  generateHeaderData() {
    return <tr className="head"><td >Date and Time</td><td>Temperature</td></tr>
  };

  generateBodyData() {
    const resultData = this.state.result;
    return resultData.map(function (item, index) {
      return <tr key={index}>
        <td>{item.dt_txt}</td>
        <td>{item.main.temp}</td>
      </tr>
    })
  };
};

export default Dashboard;