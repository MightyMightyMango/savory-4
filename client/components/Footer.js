import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <div>
      <Container>
        <List>
          <ListItem>© 2020 Mighty Mangos</ListItem>
        </List>
      </Container>
    </div>
  )
}

export default Footer

const Container = styled.footer`
  padding: 10px;
`

const ListItem = styled.li`
  list-style-type: none;
`

const List = styled.ul`
  display: flex;
  justify-content: center;
`
