import React from 'react'
import styled from 'styled-components'

const HomeBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: -1;
  top: 0px;
`

const HomePageBG = ({primary, children}) => {
  return <HomeBackground primary={primary}>{children}</HomeBackground>
}

export default HomePageBG
