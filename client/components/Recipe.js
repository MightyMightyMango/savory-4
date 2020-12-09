import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe} from '../store/singleRecipe'
import {deleteDraftThunk} from '../store/recipes'
import history from '../history'
import styled from 'styled-components'
import {render} from 'enzyme'
import RecipeForm from './RecipeForm'

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitUrl = this.submitUrl.bind(this)
    this.state = {
      isSubmitted: false
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
    // document.getElementById('url-input').value = ' '
    this.setState({isSubmitted: true})
  }

  render() {
    return (
      <>
        <Container>
          {!this.state.isSubmitted && (
            <div>
              <Title>Enter Recipe Url:</Title>
              <Form>
                <input type="text" id="url-input" />
              </Form>
              <button type="submit" onClick={() => this.submitUrl(event)}>
                Get Recipe
              </button>
            </div>
          )}
          {this.state.isSubmitted && (
            <div>
              <button
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
              </button>
              <button
                type="submit"
                onClick={() => {
                  this.handleSubmit(event)
                }}
              >
                Confirm Changes
              </button>
            </div>
          )}
          {this.state.isSubmitted && (
            <RecipeForm
              recipe={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          )}
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
