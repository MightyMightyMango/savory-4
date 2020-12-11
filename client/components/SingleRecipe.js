/* eslint-disable complexity */
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
import Button from '../theme/Button'

import FadeIn from 'react-fade-in'

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
    this.setState({canEdit: false})
    this.props.getRecipe(dataToSend.id)
  }

  render() {
    let recipe = this.props.recipe || {}
    let displayIngredients =
      typeof recipe.ingredients === 'string'
        ? recipe.ingredients.split('\n')
        : recipe.ingredients
    let displayInstructions =
      typeof recipe.instructions === 'string'
        ? recipe.instructions.split('\n')
        : recipe.instructions
    displayInstructions = displayInstructions || []
    displayIngredients = displayIngredients || []
    if (!this.state.canEdit) {
      return (
        <>
          <Container>
            <FadeIn>
              {/* HEADER */}
              <SingleRecipeHeader>
                <HeaderImage src={recipe.imageUrl} />
                <Title>{recipe.name}</Title>
              </SingleRecipeHeader>
              {/* {recipe.isDraft ? <Subtitle>Draft</Subtitle> : ''} */}

              <RecipeContainer>
                <Description>{recipe.description}</Description>
                <Image src={recipe.imageUrl} />

                <DetailsContainer>
                  {/* BUTTONS */}
                  <ActionButtons>
                    <Button primary onClick={() => this.renderForm(event)}>
                      Edit
                    </Button>
                    <Button primary>
                      <a href="/books">Edit Categories</a>
                    </Button>
                    <Button primary>
                      <a href={recipe.url} target="_blank">
                        View Recipe Source
                      </a>
                    </Button>
                    <Button primary>
                      <a
                        href={`mailto:?subject=${recipe.name}&body=${
                          recipe.url
                        }`}
                        title="Share by Email"
                      >
                        Share by Email
                      </a>
                    </Button>
                    {recipe.isDraft ? (
                      <Button
                        primary
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
                      </Button>
                    ) : (
                      <Button
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
                      </Button>
                    )}
                  </ActionButtons>
                  {/* DETAILS */}
                  <ul>
                    <li>
                      <b>Source:</b> {recipe.publisher}
                    </li>
                    <li>
                      <b>Prep Time:</b> {recipe.prepTime}
                    </li>
                    <li>
                      <b>Cook Time:</b> {recipe.cookTime}
                    </li>
                    <li>
                      <b>Yield:</b> {recipe.yield}
                    </li>
                    <li>
                      <b>Prep Time:</b> {recipe.prepTime}
                    </li>
                    <li>
                      <b>Categories:</b> {recipe.prepTime}
                    </li>
                  </ul>
                </DetailsContainer>

                {/* INGREDIENTS */}
                <Ingredients>
                  <b>Ingredients</b>
                  <ul>
                    {displayIngredients.map(ingredient => (
                      <li key={recipe.ingredients.indexOf(ingredient)}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </Ingredients>

                {/* INSTRUCTIONS */}
                <Instructions>
                  <b>Instructions</b>
                  <ul>
                    {displayInstructions.map(function(instruction) {
                      return (
                        <ListItem
                          key={'i' + recipe.instructions.indexOf(instruction)}
                        >
                          {instruction}
                        </ListItem>
                      )
                    })}
                  </ul>
                </Instructions>
              </RecipeContainer>
            </FadeIn>
          </Container>
        </>
      )
    } else {
      return (
        <div>
          <FadeIn>
            <Button
              primary
              onClick={() => {
                this.handleSubmit(event)
              }}
            >
              Confirm Changes
            </Button>
            <RecipeForm recipe={this.state} handleChange={this.handleChange} />
          </FadeIn>
        </div>
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
  // flex-direction: column;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`

const SingleRecipeHeader = styled.div`
  display: flex;
  background-color: black;
  height: 200px;
  border-bottom: none;
  flex-direction: column;
`

const Title = styled.h1`
  // height: 200px;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  background: transparent;
  font-size: 3em;
  color: white;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  z-index: 2;
`

const HeaderImage = styled.img`
  width: 100vw;
  object-fit: cover;
  overflow: hidden;
  border: none;
  opacity: 0.4;
`

const Description = styled.div`
  padding-bottom: 20px;
  width: 80%;
  justify-content: space-evenly;
`
const Image = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  top: 0px;
  left: 0px;
`

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const RecipeContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: center;
  align-self: center;
  width: 80%;
  padding-top: 20px;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 68%;
  padding-left: 20px;
`

const Subtitle = styled.b`
  font-size: 1.25em;
  padding-bottom: 5px;
  font-style: 'Oswald', sans serif;
`

const ListItem = styled.li`
  list-style-type: none;
`

const Ingredients = styled.div`
  width: 450px;
  padding-top: 20px;
  padding-right: 20px;
`

const Instructions = styled.div`
  width: calc(100% - 450px);
  padding-top: 20px;
  padding-left: 20px;
`

const Details = styled.ul`
  list-style-type: none;
`
