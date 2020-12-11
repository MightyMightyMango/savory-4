import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Navigation from '../theme/NavBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Navigation>
    <Link to="/">
      <div className="logo" />
    </Link>
    <div>
      {isLoggedIn ? (
        <div>
          {/* available after you log in */}
          <ul>
            <li>
              <Link to="/books">MY BOOKS</Link>
            </li>
            <li>
              <Link to="/myrecipes">MY RECIPES</Link>
            </li>
            <li>
              <Link to="/drafts">MY DRAFTS</Link>
            </li>
            <li>
              <Link to="/recipes">SAVE NEW RECIPES</Link>
            </li>
            <li>
              <Link to="/home">ACCOUNT</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          {/* available before you log in */}
          <ul>
            {/* <li><Link to="/home">HOME</Link></li> */}
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/signup">SIGN-UP</Link>
            </li>
            {/* <li><Link to="/signup">SIGN-UP</Link></li> */}
          </ul>
        </div>
      )}
    </div>
  </Navigation>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
