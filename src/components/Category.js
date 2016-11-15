import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Category = ({ category }) => {
  const { name } = category

  return (
    <div className="User">
      <Link to={`/${name}`}>
        <h3>
          {name && <span>({name})</span>}
        </h3>
      </Link>
    </div>
  )
}

Category.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

export default Category
