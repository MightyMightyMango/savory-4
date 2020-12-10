import React from 'react'
import styled from 'styled-components'

const Navbar = styled.div`
  background-color: #8fbc8b;
  position: sticky;
  top: 0px;
  left: 0px;
  color: black;
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;
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

  a:focus {
    text-decoration: underline;
    text-underline-position: under;
  }

  ul {
    width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  li {
    list-style-type: none;
    padding-left: 60px;
  }

  .logo {
    padding-top: 4px;
    background-image: url('images/logos/savory-logo-white.png');
    background-size: 180px;
    background-repeat: no-repeat;
    width: 180px;
    height: 80px;
    margin: 0.25em;
    z-index: 8;
  }

  .logo:hover {
    background-image: url('images/logos/savory-logo-gainsboro.png');
    background-size: 180px;
    background-repeat: no-repeat;
    width: 180px;
    height: 80px;
    margin: 0.25em;
    transition-duration: 0.4s;
    z-index: 8;
  }
`

const Navigation = ({primary, children}) => {
  return <Navbar>{children}</Navbar>
}

export default Navigation
