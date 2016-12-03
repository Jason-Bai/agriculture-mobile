import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CategoryList from '../components/CategoryList'

import { loadCategories } from '../actions'

class ContentWrapper extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    const { auth } = this.props

    return (
      <div className="wrapper">
        <CategoryList />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth
  } = state

  return {
    auth
  }
}


export default connect(mapStateToProps)(ContentWrapper)
