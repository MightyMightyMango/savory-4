import React, {useState} from 'react'
import {connect} from 'react-redux'
import {submitSuggestionThunk} from '../store/user'
import Button from '../theme/Button'

export const SuggestionBox = props => {
  // const [suggestion, submitSuggestion] = useState ({})

  const handleSubmitSuggestion = event => {
    event.preventDefault()
    console.log('event ', event)
    const siteName = document.getElementById('suggestion-name').value
    const siteUrl = document.getElementById('suggestion-url').value
    const recipeUrl = document.getElementById('suggestion-url-recipe').value

    console.log('siteName ', siteName)
    console.log('siteUrl ', siteUrl)
    console.log('recipeUrl ', recipeUrl)

    console.log('props ', props)
    console.log('userId ', props.userId)
    props.submitSuggestion({
      name: siteName,
      url: siteUrl,
      recipeUrl: recipeUrl,
      userId: props.userId
    })
  }

  return (
    <>
      <h2>Tell us which site you would like us to support!</h2>
      <form onSubmit={() => handleSubmitSuggestion(event)}>
        <label>Name:</label>
        <input type="text" id="suggestion-name" required />
        <label>Url:</label>
        <input type="text" id="suggestion-url" required />
        <label>Any specific recipe in mind? Enter its url: </label>
        <input type="text" id="suggestion-url-recipe" />
        <Button primary>Submit</Button>
      </form>
    </>
  )
}

// const mapState = (state) => ({
//   userId: state.user.id
// })

const mapDispatch = dispatch => ({
  submitSuggestion: suggestion => dispatch(submitSuggestionThunk(suggestion))
})

export default connect(null, mapDispatch)(SuggestionBox)
