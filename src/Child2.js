import React, { Component } from "react";
import * as d3 from 'd3';

class Child2 extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    d3.select(".barchart").selectAll("*").remove(); // Clear previous chart
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data2;

    // Group data by day and calculate the average tips
    const avgTipsByDay = d3.rollup(
      data,
      v => d3.mean(v, d => d.tip),
      d => d.day
    );
    const entries = Array.from(avgTipsByDay, ([day, avgTip]) => ({ day, avgTip }));

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 60, left: 60 }; // Increased left margin for y-axis labels
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Append SVG
    const svg = d3.select(".barchart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(entries.map(d => d.day))
      .range([0, width])
      .padding(0.2);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`) // Position at the bottom
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end") // Rotate text to end
      .attr("dx", "-0.5em") // Adjust x position
      .attr("dy", "0.5em") // Adjust y position
      .attr("transform", "rotate(-45)"); // Rotate labels for better visibility

    // Label for X axis
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // Adjust y position to prevent overlap
      .style("text-anchor", "middle")
      .text("Day");

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(entries, d => d.avgTip) + 1]) // Add +1 to create space above the highest bar
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
      .text("Average Tip");

    // Add bars
    svg.selectAll("bars")
      .data(entries)
      .enter()
      .append("rect")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.avgTip))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.avgTip))
      .attr("fill", "#69b3a2"); // Teal color
  }

  render() {
    return <div className="barchart"></div>;
  }
}

export default Child2;
