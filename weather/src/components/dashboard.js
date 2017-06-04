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
      result: []
    }
  }
  componentWillMount() {
    let environment = process.env.NODE_ENV || 'development';
    let url ="";
    if(environment === 'development')
    {
      url = 'http://localhost:3001/weatherForecast';
    }
    else{
      url = '/weatherForecast';
    }
    axios.get(url)
      .then(res => {
        const resData = res.data;
        this.setState({
          result: resData.list
        });
      });
  };
  render() {
    return (
      <table>
        <thead>
          {this.generateHeaderData() }
        </thead>
        <tbody>{this.generateBodyData() }</tbody>
      </table>
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