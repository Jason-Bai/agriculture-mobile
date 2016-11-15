import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoriesPage from './CategoriesPage'

class Dashboard extends Component {

  render() {
    const { logined } = this.props
    return (
      <div>
        { logined && (
          <span>Welcome to here!</span>
        )}
        { !logined && (
          <span>login here!</span>
        ) }
        <CategoriesPage />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  logined: localStorage.getItem('x-auth-token') ? true : false
})

export default connect(mapStateToProps)(Dashboard)
