import React, { Component } from "react";
import "./App.css";
import Child1 from "./Child1";  // Scatter plot component
import Child2 from "./Child2";  // Bar chart component
import * as d3 from 'd3';
import tips from './tips.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true, error: null };
  }

  componentDidMount() {
    d3.csv(tips)
      .then((csv_data) => {
        // Transform the data
        const transformedData = csv_data.map(d => ({
          tip: parseFloat(d.tip),
          total_bill: parseFloat(d.total_bill),
          day: d.day,
        }));

        this.setState({ data: transformedData, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false, error: 'Failed to load data' });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="parent">
      
        <div className="child1">
          <Child1 data1={data} />
        </div>

        
        <div className="child2">
          <Child2 data2={data} />
        </div>
      </div>
    );
  }
}

export default App;
