import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.primary ? 'column' : 'row')};
  text-align: center;
  align-items: center;
  width: 100%;
  padding-top: 130px;
  padding-bottom: 50px;

  transition-duration: 5s;
`

// const ContentWrapperWithMargins = styled(ContentWrapper)`
//   padding-top: 15%;
//   padding-left: 10%;
//   padding-right: 10%;
//   justify-content: space-evenly;
// `

const Container = ({primary, children}) => {
  return <ContentWrapper primary={primary}>{children}</ContentWrapper>
}

// const ContainerWithMargins = () => {
//   return <ContentWrapperWithMargins></ContentWrapperWithMargins>
// }

export default Container
