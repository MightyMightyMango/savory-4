import React from 'react'
import styled from 'styled-components'
import theme from './theme'

const Navbar = styled.div`
  background-color: #8fbc8b;
  position: sticky;
  top: 0px;
  left: 0px;
  color: black;
  width: 100%;
  height: 125px;
  display: flex;
  font-size: 0.7em;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.05);
  z-index: 6;

  a {
    text-decoration: none;
    color: #ffffff;
    padding: 5px;
    font-size: 1.25em;
  }

  a:hover {
    color: gainsboro;
  }

  .focused {
    text-decoration: underline;
    text-underline-position: under;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    line-height: 13px;

    @media (max-width: ${theme.breakpoints.mobile}) {
    }
  }

  li {
    list-style-type: none;
    padding-left: 50px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      padding-left: 5px;
    }
  }

  .navlink {
    padding-left: 10px;
  }

  .logo {
    padding-top: 4px;
    background-image: url('http://savory-2021.herokuapp.com/images/logos/savory-logo-white.png');
    background-size: 180px;
    background-repeat: no-repeat;
    width: 180px;
    height: 80px;
    margin: 0.25em;
    z-index: 8;

    @media (max-width: ${theme.breakpoints.mobile}) {
      background-size: 100px;
      width: 100px;
      height: 50px;
    }
  }

  .logo:hover {
    background-image: url('http://savory-2021.herokuapp.com/images/logos/savory-logo-gainsboro.png');
    background-size: 180px;
    background-repeat: no-repeat;
    width: 180px;
    height: 80px;
    margin: 0.25em;
    transition-duration: 0.4s;
    z-index: 8;

    @media (max-width: ${theme.breakpoints.mobile}) {
      background-size: 100px;
      width: 100px;
      height: 50px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.6em;
    height: 100px;
    position: sticky !important;
  }
`

const Navigation = ({primary, children}) => {
  return <Navbar>{children}</Navbar>
}

export default Navigation
