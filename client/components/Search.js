import React, {useState} from 'react'
import styled from 'styled-components'

const Search = props => {
  const [formValue, setFormValue] = useState('')

  const handleChange = value => {
    setFormValue(value)
    props.handleSort(value)
  }

  return (
    <Container>
      <form>
        <SearchBar
          type="text"
          id="search"
          value={formValue}
          onChange={event => handleChange(event.target.value)}
        />
        <MagnifyingGlass src="/images/magnifying-glass.png" />
      </form>
    </Container>
  )
}

export default Search

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    overflow: hidden;
  }
`
const MagnifyingGlass = styled.img`
  width: 35px;
  height: 30px;
  padding-left: 5px;
`
const SearchBar = styled.input`
  max-width: 600px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    overflow: hidden;
  }
`
