import React, { Component } from "react";
import * as d3 from 'd3';

class Child1 extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    d3.select(".scatterplot").selectAll("*").remove(); // Clear previous chart
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data1;

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
          width = 500 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

    // Append SVG
    const svg = d3.select(".scatterplot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total_bill)])
      .range([0, width]);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Label for X axis
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Total Bill");

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.tip)])
      .range([height, 0]);

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Label for Y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tips");

    // Add dots
    svg.append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.total_bill))
      .attr("cy", d => y(d.tip))
      .attr("r", 4)
      .style("fill", "#69b3a2"); // Teal color
  }

  render() {
    return <div className="scatterplot"></div>;
  }
}

export default Child1;
