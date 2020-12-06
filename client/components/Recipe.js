import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe} from '../store/singleRecipe'
import history from '../history'
import styled from 'styled-components'
import {render} from 'enzyme'
import RecipeForm from './RecipeForm'

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      isSubmitted: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.recipe.userId !== prevState.userId) {
      let modifiedIngredients = nextProps.recipe.ingredients.join('\n')
      let modifiedInstructions = nextProps.recipe.instructions.join('\n')
      return {
        recipe: {
          url: nextProps.recipe.url,
          name: nextProps.recipe.name,
          description: nextProps.recipe.description,
          imageUrl: nextProps.recipe.imageUrl,
          publisher: nextProps.recipe.publisher,
          ingredients: modifiedIngredients,
          instructions: modifiedInstructions,
          yield: nextProps.recipe.yield,
          prepTime: nextProps.recipe.prepTime,
          categories: nextProps.recipe.categories,
          userId: nextProps.recipe.userId,
          isDraft: nextProps.recipe.isDraft
        }
      }
    } else {
      return null
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('click')
    let dataToSend = this.state
    let formattedIngredients = this.state.recipe.ingredients.split('\n')
    let formattedInstructions = this.state.recipe.instructions.split('\n')
    dataToSend.ingredients = formattedIngredients
    dataToSend.instructions = formattedInstructions
    dataToSend.isDraft = false
    console.log('DATA SENT TO DB', dataToSend)
    this.props.submitRecipe(dataToSend)
    this.setState({})
  }

  async submitUrl(event) {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    await this.props.getSingleRecipe(url, this.props.user.id)
    // document.getElementById('url-input').value = ' '
    this.setState({isSubmitted: true})
  }

  render() {
    console.log(this.state)
    // console.log('this.props.recipe in Recipe.js', this.props.recipe)
    console.log('this.state.isSubmitted in Recipe.js', this.state.isSubmitted)
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
          {this.state.isSubmitted &&
            this.state.recipe && (
              <RecipeForm
                recipeDraft={this.state.recipe}
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
