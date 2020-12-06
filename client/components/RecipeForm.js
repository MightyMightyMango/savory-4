import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe, getUserDraft} from '../store/singleRecipe'

const defaultState = {
  url: '',
  name: 'string',
  alt_headline: '',
  thumbnail_url: '',
  publisher_name: '',
  ingredients: [],
  instructions: [],
  yield: '',
  prepTime: '',
  categories: [],
  userId: ''
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }

  componentDidMount() {
    let modifiedIngredients = this.props.recipe.ingredients.join('\n')
    let modifiedInstructions = this.props.recipe.instructions.join('\n')
    this.setState({
      url: this.props.recipe.url,
      name: this.props.recipe.name,
      description: this.props.recipe.description,
      imageUrl: this.props.recipe.imageUrl,
      publisher: this.props.recipe.publisher,
      ingredients: modifiedIngredients,
      instructions: modifiedInstructions,
      yield: this.props.recipe.yield,
      prepTime: this.props.recipe.prepTime,
      categories: this.props.recipe.categories,
      userId: this.props.userId,
      isDraft: this.props.isDraft
    })
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
    let formattedIngredients = this.state.ingredients.split('\n')
    let formattedInstructions = this.state.instructions.split('\n')
    dataToSend.ingredients = formattedIngredients
    dataToSend.instructions = formattedInstructions
    dataToSend.isDraft = false
    console.log('DATA SENT TO DB', dataToSend)
    this.props.submitRecipe(dataToSend)
  }

  render() {
    let recipe = this.state
    return (
      <div>
        <h4>
          Edit recipe details for <em>{recipe.name}</em> below, then click
          CONFIRM when you're ready to save!
        </h4>
        <img width="250px" src={recipe.imageUrl} />
        <h6>Recipe Collected From: {recipe.url} </h6>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Confirm Changes</button>
          <label>Recipe Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label>Published By:</label>
          <input
            type="text"
            name="publisher_name"
            value={this.state.publisher_name}
            onChange={this.handleChange}
          />
          <label>Source URL:</label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <label>Image URL:</label>
          <input
            type="text"
            name="thumbnail_url"
            value={this.state.thumbnail_url}
            onChange={this.handleChange}
          />
          <label>Description:</label>
          <textarea
            type="text"
            name="alt_headline"
            value={this.state.alt_headline}
            onChange={this.handleChange}
          />

          <label>Prep Time:</label>
          <input
            type="text"
            name="prepTime"
            value={this.state.prepTime}
            onChange={this.handleChange}
          />

          <label>Cook Time:</label>
          <input
            type="text"
            name="cookTime"
            value={this.state.cookTime}
            onChange={this.handleChange}
          />

          <label>Yield:</label>
          <input
            type="text"
            name="yield"
            value={this.state.yield}
            onChange={this.handleChange}
          />

          <label>Ingredients:</label>
          <textarea
            cols="60"
            rows="20"
            type="textarea"
            name="ingredients"
            value={this.state.ingredients}
            onChange={this.handleChange}
          />

          <label>Instructions</label>
          <textarea
            cols="60"
            rows="20"
            type="textarea"
            name="instructions"
            value={this.state.instructions}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  recipe: state.recipe,
  user: state.user
})

const mapDispatch = dispatch => ({
  getRecipeDraft: (url, userId) => {
    dispatch(setRecipeDraft(url, userId))
  },
  submitRecipe: recipe => {
    dispatch(submitRecipe(recipe))
  },
  getUserDraft: userId => {
    dispatch(getUserDraft(userId))
  }
})

export default connect(mapState, mapDispatch)(RecipeForm)
