import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrapper>
      <List>
        <ListItem>© 2020 Team Savory</ListItem>
      </List>
    </FooterWrapper>
  )
}

export default Footer

const FooterWrapper = styled.footer`
  padding: 10px;
  height: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  // position:fixed;
  bottom: 0px;
`

const ListItem = styled.li`
  list-style-type: none;
`

const List = styled.ul`
  display: flex;
  justify-content: center;
`
