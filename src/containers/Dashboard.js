import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'weui'

require('./style.css')

import Header from '../components/Header'
import ContentWrapper from '../containers/ContentWrapper'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

class Dashboard extends Component {
  render() {
    const { auth } = this.props
    return (
      <div>
        <Header />
        <Navbar />
        <ContentWrapper />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
