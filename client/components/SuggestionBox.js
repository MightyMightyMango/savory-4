import React, {useState} from 'react'
import {connect} from 'react-redux'
import {submitSuggestionThunk} from '../store/user'
import Button from '../theme/Button'

import {CSSTransition} from 'react-transition-group'

export const SuggestionBox = props => {
  const [showForm, setShowForm] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmitSuggestion = event => {
    event.preventDefault()
    console.log('props ', props)
    setShowConfirmation(true)
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
  }

  return (
    <>
      {showForm && (
        <>
          <h2>Tell us which site you would like us to support!</h2>
          {/* <form onSubmit={() => handleSubmitSuggestion(event)}> */}
          <form>
            <label>Name:</label>
            <input type="text" id="suggestion-name" required />
            <label>Url:</label>
            <input type="text" id="suggestion-url" required />
            <label>Any specific recipe in mind? Enter its url: </label>
            <input type="text" id="suggestion-url-recipe" />
            <Button primary onClick={() => setShowConfirmation(true)}>
              Submit
            </Button>
          </form>
        </>
      )}
      <CSSTransition
        in={showConfirmation}
        timeout={300}
        classNames="showconfirmation"
        unmountOnExit
        onEnter={() => setShowForm(false)}
        onExited={() => setShowForm(true)}
      >
        <>
          Thanks for letting us know! We'll add this as soon as possible!
          <Button onClick={() => setShowConfirmation(false)}>
            Back to Account
          </Button>
        </>
      </CSSTransition>
    </>
  )
}

const mapDispatch = dispatch => ({
  submitSuggestion: suggestion => dispatch(submitSuggestionThunk(suggestion))
})

export default connect(null, mapDispatch)(SuggestionBox)
