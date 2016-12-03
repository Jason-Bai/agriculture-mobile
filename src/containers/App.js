import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'

//    browserHistory.push(`/${nextValue}`)

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
      </p>
    )
  }

  render() {
    const { children, auth } = this.props
    let { isAuthenticated } = auth
    return (
      <div>
        {this.renderErrorMessage()}
        { !isAuthenticated && (
          <div>Click here to login!</div>
        )}
        { isAuthenticated && (
          children
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  errorMessage: state.errorMessage
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
