import React from 'react'
import {connect} from 'react-redux'
import {submitSuggestionThunk} from '../store/user'
import Button from '../theme/Button'
import styled from 'styled-components'

const SubmissionForm = styled.div`
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
  font-family: 'Merriweather', sans serif;
`

export const SuggestionBox = props => {
  const handleSubmitSuggestion = event => {
    event.preventDefault()

    const siteName = document.getElementById('suggestion-name').value
    const siteUrl = document.getElementById('suggestion-url').value
    const recipeUrl = document.getElementById('suggestion-url-recipe').value

    props.submitSuggestion({
      name: siteName,
      url: siteUrl,
      recipeUrl: recipeUrl,
      userId: props.userId
    })

    document.getElementById('suggestion-name').value = ''
    document.getElementById('suggestion-url').value = ''
    document.getElementById('suggestion-url-recipe').value = ''
    alert("Thanks for letting us know! We'll add this as soon as possible!")
  }

  return (
    <>
      <SubmissionForm>
        <Title>Want us to support a site? Let us know!</Title>
        <form onSubmit={() => handleSubmitSuggestion(event)}>
          <label>Name:</label>
          <input type="text" id="suggestion-name" required />
          <label>Url:</label>
          <input type="text" id="suggestion-url" required />
          <label>Any specific recipe in mind? Enter its url: </label>
          <input type="text" id="suggestion-url-recipe" />
          <Button primary>Submit</Button>
        </form>
      </SubmissionForm>
    </>
  )
}

const mapState = state => ({
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  submitSuggestion: suggestion => dispatch(submitSuggestionThunk(suggestion))
})

export default connect(mapState, mapDispatch)(SuggestionBox)
