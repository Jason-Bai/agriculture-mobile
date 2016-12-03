import React, { Component, PropTypes } from 'react'

import _ from 'lodash'

import config from '../config'

export default class Navbar extends Component {

  state = {
    index: 0
  }

  handleNavbar(index) {
    this.setState({
      index
    })
  }

  render() {

    let navbars = _.map(config.navbars, (navbar, index) => {

      let hash = `#${navbar._id}`, className

      if (index === this.state.index) {
        className = "weui_grid weui_egrid weui_egrid_on"
      } else {
        className = "weui_grid weui_egrid"
      }

      return (
        <a key={navbar.name} href={hash} name={navbar.name} className={className} onClick={() => { this.handleNavbar(index)}}>
          <div className="weui_grid_icon">
            <i className={navbar.icon}></i>
          </div>
          <p className="weui_grid_label">{navbar.title}</p>
        </a>
      )
    })

    return (
      <div>
        <div className="bd">
				  <div className="weui_grids">
            {navbars}
				  </div>
				</div>
			</div>
		)
  }
}
