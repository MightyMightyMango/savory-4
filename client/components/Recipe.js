import React from 'react'
import {connect} from 'react-redux'
import {setRecipeThunk, passRecipe} from '../store/singleRecipe'
import history from '../history'
import styled from 'styled-components'

export const Recipe = props => {
  const {getSingleRecipe} = props
  let userId = 0

  const submitUrl = event => {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    getSingleRecipe(url, userId)
    console.log('Recipe Component: props ', props)
    const res = JSON.parse(localStorage.getItem(`recipeDraft`))
    console.log('Recipe Component res = ', res)
    passRecipe(res)
    console.log('Recipe Component: props again', props)
    document.getElementById('url-input').value = ' '
    history.push('/recipeform')
  }
  return (
    <>
      <Container>
        <Title>Enter Recipe Url:</Title>
        <Form>
          <input type="text" id="url-input" />
        </Form>
        <button type="submit" onClick={() => submitUrl(event)}>
          Get Recipe
        </button>
      </Container>
    </>
  )
}

const mapState = state => ({
  recipe: state.recipe
})

const mapDispatch = dispatch => ({
  getSingleRecipe: (url, userId) => {
    setRecipeThunk(url, userId)
  },
  passRecipe: recipe => {
    passRecipe(recipe)
  }
})

export default connect(mapState, mapDispatch)(Recipe)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 87vh;
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`
const Form = styled.form`
  display: flex;
  justify-contents: center;
  align-items: center;
`
