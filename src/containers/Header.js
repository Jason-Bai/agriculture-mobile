import React, { Component } from 'react'
import Slider from './Slider'
import WeUI from 'react-weui'
import 'weui'

export default class Header extends Component {
  render() {
    return (
      <header className="container">
        <Slider />
      </header>
    )
  }
}