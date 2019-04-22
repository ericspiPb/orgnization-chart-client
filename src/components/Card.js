import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Card.css"

export default class Card extends React.Component {
  attrs = {
    nodePadding: 9,
    nodeWidth: 210,
    nodeHeight: 80
  }

  render() {
    var dynamic = {}
    dynamic.nodeImageWidth = this.attrs.nodeHeight * 100 / 140
    dynamic.nodeImageHeight = this.attrs.nodeHeight - 2 * this.attrs.nodePadding
    dynamic.nodeTextLeftMargin = this.attrs.nodePadding * 2 + dynamic.nodeImageWidth
    dynamic.rootNodeLeftMargin = this.attrs.width / 2
    dynamic.nodePositionNameTopMargin = this.attrs.nodePadding + 8 + dynamic.nodeImageHeight / 4 * 1
    dynamic.nodeChildCountTopMargin = this.attrs.nodePadding + 16 + dynamic.nodeImageHeight / 4 * 3

    return  <g className="node-group">
              <rect width={this.attrs.nodeWidth} height={this.attrs.nodeHeight} className="nodeHasChildren" strokeWidth="1px" stroke="#cccccc"></rect>
              <image x={this.attrs.nodePadding} y={this.attrs.nodePadding} href="https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg" preserveAspectRatio="none" width="58" height="58"></image>

              <text x={dynamic.nodeTextLeftMargin} y={this.attrs.nodePadding + 10} className="emp-name" textAnchor="left">Ian Devling</text>
              <text x={dynamic.nodeTextLeftMargin} y={dynamic.nodePositionNameTopMargin} className="emp-position-name" dy=".35em" textAnchor="left">Cheaf Executive Officer </text>
              <text x={dynamic.nodeTextLeftMargin} y={this.attrs.nodePadding + 10 + dynamic.nodeImageHeight / 4 * 2} className="emp-area" dy=".35em" textAnchor="left">Corporate</text>

              <text x={dynamic.nodeTextLeftMargin} y={dynamic.nodeChildCountTopMargin} className="emp-count-icon" textAnchor="left"></text>
              <FontAwesomeIcon x={dynamic.nodeTextLeftMargin} y={dynamic.nodeChildCountTopMargin - 10} width="10px" height="10px" icon="user"/>
              <text x={dynamic.nodeTextLeftMargin + 13} y={dynamic.nodeChildCountTopMargin} className="emp-count" textAnchor="left">4</text>
            </g>
  }
}