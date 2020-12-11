import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe} from '../store/singleRecipe'
import {deleteDraftThunk} from '../store/recipes'
import history from '../history'
import styled from 'styled-components'
import {render} from 'enzyme'
import RecipeForm from './RecipeForm'
import Button from '../theme/Button'
// import Container from '../theme/Container'

import Loader from './Loader'
import FadeIn from 'react-fade-in'

import {CSSTransition, TransitionGroup} from 'react-transition-group'

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitUrl = this.submitUrl.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      isSubmitted: false,
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.recipe.id !== prevState.id) {
      let newState = nextProps.recipe
      newState.ingredients = Array.isArray(newState.ingredients)
        ? nextProps.recipe.ingredients.join('\n')
        : nextProps.recipe.ingredients
      newState.instructions = Array.isArray(newState.instructions)
        ? nextProps.recipe.instructions.join('\n')
        : nextProps.recipe.instructions
      return newState
    } else {
      return null
    }
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let dataToSend = this.state
    delete dataToSend.isSubmitted
    dataToSend.ingredients =
      typeof dataToSend.ingredients === 'string'
        ? dataToSend.ingredients.split('\n')
        : dataToSend.ingredients
    dataToSend.instructions =
      typeof dataToSend.instructions === 'string'
        ? dataToSend.instructions.split('\n')
        : dataToSend.instructions
    dataToSend.isDraft = false
    console.log('DATA SENT TO DB', dataToSend)
    this.props.submitRecipe(dataToSend)

    window.alert('Recipe Saved!')
    history.push(`/recipes/${dataToSend.id}`)
  }

  handleDeleteDraft = event => {
    event.preventDefault()
    this.props.deleteDraft(this.state.id)
    this.setState({isSubmitted: false})
    console.log(this.state)
  }

  async submitUrl(event) {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    await this.props.getSingleRecipe(url, this.props.user.id)
    // document.getElementById('url-input').value = '
    // setTimeout(() => this.setState({isSubmitted: true, loading: true}), 3000)
    setTimeout(() => this.setState({isSubmitted: true, loading: false}), 3000)
  }

  async handleKeyPress(event) {
    event.preventDefault()
    console.log('key pressed, charCode', event.charCode)
    console.log('key pressed, keyCode', event.keyCode)
    console.log('key pressed, keyCode', event.key)
    console.log('event ', event)
    console.log('event.value ', event.value)
    if (event.keyCode == 13 || event.key == 'Enter') {
      const url = document.getElementById('url-input').value
      await this.props.getSingleRecipe(url, this.props.user.id)
      // document.getElementById('url-input').value = ' '
      this.setState({isSubmitted: true})
    }
  }

  render() {
    return (
      <>
        <Container>
          {!this.state.isSubmitted && (
            <RecipeScrape>
              <Title>Enter Recipe Url:</Title>
              <Form onSubmit={() => this.submitUrl(event)}>
                <input type="text" id="url-input" />
              </Form>
              <Button
                primary
                type="submit"
                onClick={() => this.submitUrl(event)}
              >
                Get Recipe
              </Button>
            </RecipeScrape>
          )}
          {this.state.isSubmitted && (
            <Actions>
              <FadeIn>
                <Button
                  primary
                  type="submit"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to abandon your draft? It will not be saved.'
                      )
                    ) {
                      this.handleDeleteDraft(event)
                    }
                  }}
                >
                  Abandon Draft
                </Button>
                <Button
                  primary
                  type="submit"
                  onClick={() => {
                    this.handleSubmit(event)
                  }}
                >
                  Confirm Changes
                </Button>
              </FadeIn>
            </Actions>
          )}
          {this.state.isSubmitted &&
            (this.state.loading ? (
              <Loader />
            ) : (
              <FadeIn>
                <RecipeForm
                  recipe={this.state}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                />
              </FadeIn>
            ))}
        </Container>
      </>
    )
  }
}

const mapState = state => ({
  recipe: state.recipe,
  user: state.user
})

const mapDispatch = dispatch => ({
  getSingleRecipe: (url, userId) => {
    dispatch(setRecipeDraft(url, userId))
  },
  submitRecipe: recipe => {
    dispatch(submitRecipe(recipe))
  },
  deleteDraft: recipeId => dispatch(deleteDraftThunk(recipeId))
})

export default connect(mapState, mapDispatch)(Recipe)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  padding-top: 50px;
  height: 100vh;
`

const RecipeScrape = styled.div`
  width: 70%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
  font-family: 'Merriweather', sans serif;
`
const Form = styled.form`
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 100%;
`

const Actions = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`
