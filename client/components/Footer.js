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

const FooterWrapper = styled.div`
  padding: 10px;
  height: 50px;
  background-color: #ffffff;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
`

const ListItem = styled.li`
  list-style-type: none;
`

const List = styled.ul`
  display: flex;
  justify-content: center;
`
