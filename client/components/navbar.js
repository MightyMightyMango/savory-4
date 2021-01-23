import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import Navigation from '../theme/NavBar'
import styled from 'styled-components'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Navigation>
    <Link to="/">
      <div className="logo" />
    </Link>
    <div>
      {isLoggedIn ? (
        <Nav>
          {/* available after you log in */}
          <ul>
            <NavLink className="navlink" to="/books" activeClassName="focused">
              MY BOOKS
            </NavLink>
            <NavLink
              className="navlink"
              to="/myrecipes"
              activeClassName="focused"
            >
              MY RECIPES
            </NavLink>
            <NavLink className="navlink" to="/drafts" activeClassName="focused">
              MY DRAFTS
            </NavLink>
            <NavLink
              className="navlink"
              to="/recipes"
              activeClassName="focused"
            >
              SAVE NEW RECIPES
            </NavLink>
            <NavLink
              className="navlink"
              to="/contact"
              activeClassName="focused"
            >
              CONTACT
            </NavLink>
            <a href="#" onClick={handleClick}>
              LOGOUT
            </a>
          </ul>
        </Nav>
      ) : (
        <Nav>
          {/* available before you log in */}
          <ul>
            {/* <Link to="/home">HOME</Link>*/}
            <NavLink
              className="navlink"
              to="/contact"
              activeClassName="focused"
            >
              CONTACT
            </NavLink>
            <NavLink className="navlink" to="/login" activeClassName="focused">
              LOGIN
            </NavLink>
            <NavLink className="navlink" to="/signup" activeClassName="focused">
              SIGN-UP
            </NavLink>
            {/* <Link to="/signup">SIGN-UP</Link> */}
          </ul>
        </Nav>
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

const Nav = styled.div``
