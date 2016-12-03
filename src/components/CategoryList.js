import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { loadCategories } from '../actions'

class CategoryList extends Component {

  constructor(props) {
    super(props)
		this.renderCategories = this.renderCategories.bind(this)
  }

  state = {
    categories: []
  }

  componentWillMount() {
    const {
      loadCategories,
      dispatch
    } = this.props
    const params = {
      page: 1,
      pre_count: 1000
    }
    dispatch(loadCategories(params))
  }

  renderErroMessage() {
  }

	renderCategories() {

		const {
			categories: {
				data
			}
		} = this.props


		let v1s = _.filter(data, d => {
			return d.level === 1
		}), v2s = _.map(v1s, v1 => {
			let ret = {
				category: v1,
				children: []
			}
			ret.children = _.filter(data, d => {
				return d.parentId === v1._id
			})
			return ret
		}), contents = _.map(v2s, _v2s => {
			let { category, children } = _v2s
			let i = 0, len = children.length
			for(; i < len; i++) {
				let child = children[i]
				child.children = _.filter(data, d => {
					return d.parentId == child._id
				})
			}
			let ret = {
				category,
				children
			}
			return ret
		})

		console.log(contents)
	}

  render() {

		let categories = this.renderCategories()


    return (
      <div id="scroller">
        {this.renderErroMessage()}
				<div className="weui_epanel">
					<div className="weui_epanel_hd">
						农作物
					</div>
					<div className="weui_epanel_bd">
						<div className="weui_ecells_title">禾谷类作物</div>
						<div className="weui_ecells">
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
							<a href="#" className="weui_ecell_1">
								<span className="weui_ecell_label">小麦</span>
							</a>
						</div>
					</div>
				</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
	const { auth, categories } = state
	return {
		auth,
		categories
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories,
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
