import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import history from '../history'
import {submitRecipe} from '../store/singleRecipe'
import {
  setSingleRecipeThunk,
  deleteRecipeThunk,
  deleteDraftThunk
} from '../store/recipes'
import RecipeForm from './RecipeForm'

export class SingleRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      canEdit: false
    }
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
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
      // newState.instructions = nextProps.recipe.instructions.join('\n')
      return newState
    } else {
      return null
    }
  }

  handleDeleteDraft = event => {
    event.preventDefault()
    this.props.deleteDraft(recipeId)
    history.push('/drafts')
  }

  handleDeleteRecipe = event => {
    event.preventDefault()
    this.props.deleteRecipe(recipeId)
    history.push('/myrecipes')
  }

  renderForm = event => {
    event.preventDefault()
    this.setState({canEdit: true})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let dataToSend = this.state
    delete dataToSend.canEdit
    dataToSend.ingredients = this.state.ingredients.split('\n')
    dataToSend.instructions = this.state.instructions.split('\n')
    dataToSend.isDraft = false
    console.log('DATA SENT TO DB', dataToSend)
    this.props.submitRecipe(dataToSend)
    this.setState({})
    history.push(`/recipes/${dataToSend.id}`)
  }

  render() {
    let recipe = this.props.recipe || {}
    if (!this.state.canEdit) {
      return (
        <>
          <Container>
            <button onClick={() => this.renderForm(event)}>Edit</button>
            <Title>{recipe.name}</Title>
            {recipe.isDraft ? <Subtitle>Draft</Subtitle> : ''}
            <Subtitle />
            <RecipeContainer>
              <Image src={recipe.imageUrl} />
              <Details>
                <div>{recipe.description}</div>
                <div>Source: {recipe.publisher}</div>
                <div>Link: {recipe.url}</div>
                <div>Prep Time: {recipe.prepTime}</div>
                <div>Cook Time: {recipe.cookTime}</div>
                <div>Yield: {recipe.yield}</div>
                <div>Categories: {recipe.categories}</div>
              </Details>

              <Ingredients>
                <Subtitle>Ingredients</Subtitle>
                {Array.isArray(recipe.ingredients) ? (
                  <ul>
                    {recipe.ingredients.map(ingredient => (
                      <ListItem key={recipe.ingredients.indexOf(ingredient)}>
                        {ingredient}
                      </ListItem>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </Ingredients>
              <Instructions>
                <Subtitle>Instructions</Subtitle>
                {Array.isArray(recipe.instructions) ? (
                  <ul>
                    {recipe.instructions.map(instruction => (
                      <ListItem key={recipe.instructions.indexOf(instruction)}>
                        Step 1: {instruction}
                      </ListItem>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </Instructions>
            </RecipeContainer>
            {recipe.isDraft ? (
              <button
                type="submit"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to delete this draft?'
                    )
                  )
                    this.handleDeleteDraft(event)
                }}
              >
                Delete Draft
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to delete this recipe?'
                    )
                  )
                    this.handleDeleteRecipe(event)
                }}
              >
                Delete Recipe
              </button>
            )}
          </Container>
        </>
      )
    } else {
      return (
        <RecipeForm
          recipe={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      )
    }
  }
}

const mapState = state => ({
  recipe: state.recipes.singleRecipe,
  recipes: state.recipes.allRecipes
})

const mapDispatch = dispatch => ({
  getRecipe: recipeId => dispatch(setSingleRecipeThunk(recipeId)),
  deleteRecipe: recipeId => dispatch(deleteRecipeThunk(recipeId)),
  deleteDraft: recipeId => dispatch(deleteDraftThunk(recipeId)),
  submitRecipe: recipe => {
    dispatch(submitRecipe(recipe))
  }
})

export default connect(mapState, mapDispatch)(SingleRecipe)

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
`
const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
  width: 100%;
`

const Image = styled.img`
  width: 30%;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
  padding-bottom: 20px;
`

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 70%;
  padding-top: 20px;
`

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  padding-left: 20px;
`

const Subtitle = styled.div`
  font-size: 1em;
  padding-bottom: 5px;
`

const ListItem = styled.li`
  list-style-type: none;
`

const Ingredients = styled.div`
  width: calc(30%-20px);
  padding: 20px;
`

const Instructions = styled.div`
  width: calc(70%-20px);
  padding: 20px;
`
