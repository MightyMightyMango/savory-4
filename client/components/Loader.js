import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const Loader = props => (
  <>
    <LoaderContainer>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#ffffff"
        foregroundColor="#8fbc8b"
        {...props}
      >
        <circle cx="87" cy="137" r="20" />
        <circle cx="191" cy="110" r="38" />
        <circle cx="112" cy="69" r="20" />
        <circle cx="284" cy="69" r="37" />
        <circle cx="48" cy="71" r="12" />
        <circle cx="173" cy="40" r="7" />
        <circle cx="282" cy="149" r="12" />
        <circle cx="339" cy="134" r="19" />
      </ContentLoader>
    </LoaderContainer>
  </>
)

export default Loader

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
