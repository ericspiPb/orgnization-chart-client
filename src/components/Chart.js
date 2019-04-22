import React from 'react'

import Card from "./Card"
import imageLoaderService from "../services/ImageLoaderService"
import dataLoaderService from "../services/DataLoaderService"

import * as d3 from "d3"

export default class Chart extends React.Component {
  state = {
    margin: {top: 10, right: 120, bottom: 10, left: 40},
    width: window.innerWidth - 40,
    height: window.innerHeight - 40,
    dx: 10,
    dy: 200,
    data: null
  }

  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
  }

  diagonal() {
    d3.linkHorizontal().x(d => d.y).y(d=> d.x)
  }

  componentWillMount() {
    imageLoaderService.load()
    dataLoaderService.load("data.json").then(data => this.setState({data}))
  }

  componentDidUpdate(prevProps) {
    this.createChart()
  }

  createChart = () => {
    const root = d3.hierarchy(this.state.data);

    root.x0 = this.state.dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    const svg = d3.select(`${this.props.id}`)
        .attr("width", this.state.width)
        .attr("height", this.state.dx)
        .attr("viewBox", [-this.state.margin.left, -this.state.margin.top, this.state.width, this.state.dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

    const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer");

    this.update(svg, root, svg.node(), gNode, gLink)
  }
  
  update(svg, root, source, gNode, gLink) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();

    // Compute the new tree layout.
    const tree = d3.tree().nodeSize([this.state.dx, this.state.dy]);
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + this.state.margin.top + this.state.margin.bottom;

    const transition = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", [-this.state.margin.left, left.x - this.state.margin.top, this.state.width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", d => {
          d.children = d.children ? null : d._children;
          this.update(d);
        });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999");

    nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
      .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    })
  }

  render() {
    return <svg id={this.props.id} width={this.state.width} height={this.state.height}></svg>
  }
}