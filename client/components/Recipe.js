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
  loading: false,
  error: false,
  notAccepted: false
}

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitUrl = this.submitUrl.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = defaultState
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('this.props.recipe', this.props.recipe)
    if (this.props.recipe.id && this.props.recipe.id !== prevProps.recipe.id) {
      let newState = this.props.recipe
      newState.ingredients = Array.isArray(newState.ingredients)
        ? this.props.recipe.ingredients.join('\n')
        : this.props.recipe.ingredients
      newState.instructions = Array.isArray(newState.instructions)
        ? this.props.recipe.instructions.join('\n')
        : this.props.recipe.instructions
      this.setState(newState)
    }
    if (this.props.recipe === 'error') {
      this.setState(defaultState)
      this.props.resetRecipeState()
      history.push('/error')
    }
    if (this.props.recipe === 'notAccepted') {
      this.setState(defaultState)
      this.props.resetRecipeState()
      history.push('/notaccepted')
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
    delete dataToSend.errorScraping
    delete dataToSend.notAccepted
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

  handleDeleteDraft = event => {
    event.preventDefault()
    this.props.deleteDraft(this.state.id)
    this.props.resetRecipeState()
    this.setState(defaultState)
  }

  async submitUrl(event) {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    await this.props.getSingleRecipe(url, this.props.user.id)
    this.setState({isSubmitted: true, loading: true})
    setTimeout(() => this.setState({isSubmitted: true, loading: false}), 3000)
  }

  async handleKeyPress(event) {
    event.preventDefault()
    if (event.keyCode == 13 || event.key == 'Enter') {
      const url = document.getElementById('url-input').value
      await this.props.getSingleRecipe(url, this.props.user.id)
      this.setState({isSubmitted: true})
    }
  }

  render() {
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
