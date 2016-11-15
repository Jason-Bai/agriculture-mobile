import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from '../actions'
import Category from '../components/Category'
import List from '../components/List'
import zip from 'lodash/zip'

const loadData = ({ loadCategories }) => {
  loadCategories()
}

class CategoriesPage extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
  }

  renderCategory([ category ]) {
    return (
      <Category
        category={category}
        key={category.name} />
    )
  }

  render() {

    const { categories } = this.props

    if (!categories) {
      return <h1><i>Loading categories...</i></h1>
    }

    return (
      <div>
        <List renderItem={this.renderCategory}
              items={zip(categories)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={'Loading categories...'}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    entities: { categories }
  } = state


  return {
    categories
  }
}

export default connect(mapStateToProps, {
  loadCategories,
})(CategoriesPage)
