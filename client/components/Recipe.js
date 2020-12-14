import React from 'react'
import {connect} from 'react-redux'
import {
  setRecipeDraft,
  submitRecipe,
  resetRecipeState
} from '../store/singleRecipe'
import {deleteDraftThunk} from '../store/recipes'
import history from '../history'
import styled from 'styled-components'
import RecipeForm from './RecipeForm'
import Button from '../theme/Button'
import SuggestionBox from './SuggestionBox'

import Loader from './Loader'
import FadeIn from 'react-fade-in'

// import {CSSTransition, TransitionGroup} from 'react-transition-group'

const defaultState = {
  url: '',
  name: '',
  description: '',
  imageUrl: '',
  publisher: '',
  ingredients: [],
  instructions: [],
  yield: '',
  prepTime: '',
  cookTime: '',
  categories: {},
  userId: '',
  isDraft: '',
  isSubmitted: false,
  loading: false
}

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitUrl = this.submitUrl.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.state = defaultState
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps in get derived state from props', nextProps)
    if (nextProps.recipe.id && nextProps.recipe.id !== prevState.id) {
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

  async handleSubmit(evt) {
    evt.preventDefault()
    let dataToSend = this.state
    delete dataToSend.isSubmitted
    delete dataToSend.loading
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
    await this.props.submitRecipe(dataToSend)
    window.alert('Recipe Saved!')
    this.props.resetRecipeState()
    this.setState(defaultState)
    history.push(`/recipes/${dataToSend.id}`)
  }

  async componentWillUnmount() {
    console.log('componentWillUnmount')
    await this.props.resetRecipeState()
  }

  handleDeleteDraft = event => {
    event.preventDefault()
    this.props.deleteDraft(this.state.id)
    this.props.resetRecipeState()
    this.setState(defaultState)
  }

  validateInput = url => {
    if (url.length !== 0) {
      if (url.includes('bonappetit.com/recipe')) {
        return true
      } else if (url.includes('cooking.nytimes.com/recipes')) {
        return true
      } else if (url.includes('simplyrecipes.com/recipes')) {
        return true
      } else if (url.includes('allrecipes.com/recipe')) {
        return true
      } else if (url.includes('foodnetwork.com/recipes')) {
        return true
      } else if (url.includes('eatingwell.com/recipe')) {
        return true
      } else if (url.includes('tasty.co/recipe')) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  async submitUrl(event) {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    if (this.validateInput(url)) {
      await this.props.getSingleRecipe(url, this.props.user.id)
      this.setState({isSubmitted: true, loading: true})
      setTimeout(() => this.setState({isSubmitted: true, loading: false}), 3000)
    } else {
      alert(
        'Sorry that is an invalid url. Want us to support recipe collection from this site? Fill out the form at the bottom of this page.'
      )
    }
  }

  async handleKeyPress(event) {
    event.preventDefault()
    if (event.keyCode == 13 || event.key == 'Enter') {
      const url = document.getElementById('url-input').value
      await this.props.getSingleRecipe(url, this.props.user.id)
      // document.getElementById('url-input').value = ' '
      this.setState({isSubmitted: true})
    }
  }

  render() {
    // console.log('this.props in render', this.props)
    // console.log('this.state in render', this.state)
    return (
      <>
        <FadeIn>
          <Container>
            {!this.state.isSubmitted && (
              <>
                <RecipeScrape>
                  <Title>Enter Recipe Url:</Title>
                  <Form onSubmit={() => this.submitUrl(event)}>
                    <input type="text" id="url-input" required />
                  </Form>
                  <Button
                    primary
                    type="submit"
                    onClick={() => this.submitUrl(event)}
                  >
                    Get Recipe
                  </Button>
                </RecipeScrape>

                <Supported>
                  <Title>Supported Sites:</Title>
                  <Logos>
                    <img
                      className="supported-logo"
                      src="/images/supported/all-recipes.png"
                    />
                    <img
                      className="supported-logo"
                      src="/images/supported/bon-appetit.png"
                    />
                    <img
                      className="supported-logo"
                      src="/images/supported/eating-well.png"
                    />
                    <img
                      className="supported-logo"
                      src="/images/supported/food-network.png"
                    />
                    <img
                      className="supported-logo"
                      src="/images/supported/nyt-cooking.png"
                    />
                    <img
                      className="supported-logo"
                      src="/images/supported/simply-recipes.png"
                    />
                  </Logos>
                </Supported>

                <Submission>
                  <SuggestionBox />
                </Submission>
              </>
            )}
            {this.state.isSubmitted && (
              <FadeIn>
                <Actions>
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
                </Actions>
              </FadeIn>
            )}
            {this.state.isSubmitted &&
              (this.state.loading ? (
                <Loader />
              ) : (
                <FadeIn>
                  <Saved>
                    Recipe Saved! You can view it in your drafts or make edits
                    below and press 'confirm' when you're done.
                  </Saved>
                  <RecipeForm
                    recipe={this.state}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                  />
                </FadeIn>
              ))}
          </Container>
        </FadeIn>
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
  deleteDraft: recipeId => dispatch(deleteDraftThunk(recipeId)),
  resetRecipeState: () => dispatch(resetRecipeState())
})

export default connect(mapState, mapDispatch)(Recipe)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  padding-top: 50px;
`

const RecipeScrape = styled.div`
  width: 70%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 45px;
  // margin-bottom: 45px;
  padding: 50px 20px;
  border: 1px solid black;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px;
    width: 90%;
    padding-bottom: 30px;
    margin-top: 10px;
  }
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
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Saved = styled.p`
  padding-top: 50px;
  margin: 20px;
  text-align: center;
`

const Supported = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  padding-top: 80px;
  width: 70%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 90%;
  }
`
const Logos = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .supported-logo {
    padding: 10px;
    height: 55px;
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      height: 40px;
      padding: 7px;
    }
  }
`

const Submission = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
    padding-bottom: 20px;
    width: 90%;
    margin-top: 10px;
  }
`
