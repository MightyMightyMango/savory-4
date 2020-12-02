import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'

const Navbar = ({handleClick, isLoggedIn}) => (
 <NavbarContainer>
    <Link to="/home">Home</Link>
      <div>
        {isLoggedIn ? (
        <div>
          {/* available after you log in */}
          <Link to="/recipes">Fetch Recipe</Link>
          <span> | </span>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* available before you log in */}
          <Link to="/login">Login</Link>
          <span> | </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      )} 
    </div>
  </NavbarContainer>
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

const NavbarContainer = styled.div`
  color: black;
  width: 100%;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    padding: 5px;
  }

  a:hover {
    color: grey;
    cursor: grab;
  }
`
