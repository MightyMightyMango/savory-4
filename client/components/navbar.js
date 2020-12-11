import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
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
              <NavLink to="/books" activeClassName="focused">
                MY BOOKS
              </NavLink>
            </li>
            <li>
              <NavLink to="/myrecipes" activeClassName="focused">
                MY RECIPES
              </NavLink>
            </li>
            <li>
              <NavLink to="/drafts" activeClassName="focused">
                MY DRAFTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/recipes" activeClassName="focused" as="/savenew">
                SAVE NEW RECIPES
              </NavLink>
              {/* <a href="/recipes">SAVE NEW RECIPES</a> */}
            </li>
            <li>
              <NavLink to="/home" activeClassName="focused">
                ACCOUNT
              </NavLink>
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
              <NavLink to="/login" activeClassName="focused">
                LOGIN
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="focused">
                SIGN-UP
              </NavLink>
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
