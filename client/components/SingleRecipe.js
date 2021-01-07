/* eslint-disable complexity */
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import history from '../history'
// import {resetRecipeState} from '../store/singleRecipe'
import {
  submitRecipeEdit,
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
    this.props.deleteDraft(this.props.recipe.id)
    history.push('/drafts')
  }

  handleDeleteRecipe = event => {
    event.preventDefault()
    this.props.deleteRecipe(this.props.recipe.id)
    history.push('/myrecipes')
  }

  renderForm = event => {
    event.preventDefault()
    this.setState({canEdit: true})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  formatEmailText() {}

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
    dataToSend.isDraft = true
    console.log('DATA SENT TO DB', dataToSend)
    this.props.submitRecipeEdit(dataToSend)
    this.setState({canEdit: false})
    this.props.getRecipe(dataToSend.id)
  }

  render() {
    let recipe = this.props.recipe || {}

    // FORMAT INGREDIENTS AND INSTRUCTIONS FOR RENDER

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

    // FORMAT RECIPE FOR EMAIL

    const {name, publisher, url, description, prepTime, cookTime} =
      this.props.recipe || {}

    const ingredientList = displayIngredients.join('%0D%0A')
    let instructionList = ''
    if (displayInstructions.length > 0) {
      instructionList = displayInstructions.reduce((list, instruction) => {
        return list + `${instruction}%0D%0A%0D%0A`
      })
    }

    const emailText =
      'Check out this recipe I saved with the Savory App! http://www.savory-app.com%0D%0A%0D%0A' +
      name +
      '%0D%0A%0D%0A' +
      description +
      '%0D%0A%0D%0A' +
      'Ingredients%0D%0A%0D%0A' +
      ingredientList +
      '%0D%0A%0D%0A' +
      'Instructions%0D%0A%0D%0A' +
      instructionList +
      'Prep Time: ' +
      prepTime +
      '%0D%0A' +
      'Cook Time: ' +
      cookTime +
      '%0D%0A' +
      'Yield: ' +
      this.props.recipe.yield +
      '%0D%0A' +
      'Publisher: ' +
      this.props.recipe.publisher +
      ' at:%0D%0A' +
      this.props.recipe.url

    if (!this.state.canEdit) {
      return (
        <>
          <FadeIn>
            <Container>
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
                        href={`mailto:?&subject=Shared from Savory: ${
                          recipe.name
                        }&body=${emailText}`}
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
                  <ol>
                    {displayInstructions.map(function(instruction) {
                      return (
                        <ListItem
                          key={'i' + recipe.instructions.indexOf(instruction)}
                        >
                          {instruction}
                        </ListItem>
                      )
                    })}
                  </ol>
                </Instructions>
              </RecipeContainer>
            </Container>
          </FadeIn>
        </>
      )
    } else {
      return (
        <FadeIn>
          <Confirm>
            <ConfirmHeading>
              <Button
                primary
                onClick={() => {
                  this.handleSubmit(event)
                }}
              >
                Confirm Changes
              </Button>
              <p>Make your changes below and when you're done click confirm!</p>
            </ConfirmHeading>
            <RecipeForm recipe={this.state} handleChange={this.handleChange} />
            <ConfirmHeading>
              <Button
                primary
                onClick={() => {
                  this.handleSubmit(event)
                }}
              >
                Confirm Changes
              </Button>
            </ConfirmHeading>
          </Confirm>
        </FadeIn>
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
  submitRecipeEdit: recipe => {
    dispatch(submitRecipeEdit(recipe))
  },
  resetRecipeState: () => dispatch(resetRecipeState())
})

export default connect(mapState, mapDispatch)(SingleRecipe)

const Container = styled.div`
  display: flex;
  text-align: center;
  // flex-direction: column;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

const Confirm = styled.div`
  padding-top: 20px;
<<<<<<< HEAD
  margin-bottom: 30px;
=======
  text-align: center;
>>>>>>> 4031df4f03065d5027cb8a4bfe2d062173296c29
`

const SingleRecipeHeader = styled.div`
  display: flex;
  background-color: black;
  height: 200px;
  border-bottom: none;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
`

const Title = styled.h1`
  // height: 200px;
  padding-top: 10px;
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
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2em;
  }
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
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 90%;
  }
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
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0px;
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
  //width: 68%;
  //padding-left: 20px;
`

const Subtitle = styled.b`
  font-size: 1.25em;
  padding-bottom: 5px;
  font-style: 'Oswald', sans serif;
`

const ListItem = styled.li`
  list-style-type: decimal;
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding-left: 0px;
  }
`

const Details = styled.ul`
  list-style-type: none;
`
const ConfirmHeading = styled.div`
  padding: 20px;
  p {
    margin-left: 8px;
  }
`
