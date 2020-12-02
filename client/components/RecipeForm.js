import React from 'react'
import {connect} from 'react-redux'

// const dummyData = {
//   url: 'https://www.bonappetit.com/recipe/swedish-glogg',
//   name: 'Swedish Glögg',
//   alt_headline:
//     'A warm ruby red mulled wine packed with enough cinnamon, cardamom, and ginger to make the whole house smell like the holidays.',
//   thumbnail_url:
//     'https://assets.bonappetit.com/photos/5fbd604d2585b69d6e405d3b/1:1/w_1125,h_1125,c_limit/1220-NYE-Glogg-AW.jpg',
//   publisher_name: 'Bon Appetit',
//   ingredients: [
//     '2 cinnamon sticks, broken into pieces',
//     '1 tsp. cardamom pods',
//     '1 small piece ginger, peeled',
//     'Zest of ½ orange',
//     '6 whole cloves',
//     '½ cup vodka',
//     '1 750-ml bottle dry red wine',
//     '1 cup ruby port or Madeira',
//     '1 cup granulated sugar',
//     '1 Tbsp. vanilla sugar',
//     '½ blanched whole almonds',
//     '½ cup dark raisins',
//   ],
//   instructions: [
//     'Crush cinnamon and cardamom in a mortar and pestle (or put them on a cutting board and crush with the bottom of a heavy pot.) Transfer to a small glass jar and add ginger, orange zest, cloves, and vodka. Let sit 1 day.',
//     'Strain vodka through a fine-mesh sieve into a large saucepan; discard spices. Add wine, port, granulated sugar, vanilla sugar, almonds, and raisins and heat over medium just until bubbles start to form around the edges.',
//     'Ladle glögg into mugs, with a few almonds and raisins in each one. Keep any remaining glögg warm over very low heat until ready to serve (do not let it boil).',
//   ],
//   yield: 'Makes about 1½ quarts',
//   prepTime: '',
//   cookTime: '',
//   categories: [],
//   userId: 0,
// }

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
    let recipeData = this.props.recipe || {}
    console.log('in CDM')
    console.log(this.props.recipe)
    // let modifiedData = dummyData
    // modifiedData.ingredients = dummyData.ingredients.join('\n')
    // modifiedData.instructions = dummyData.instructions.join('\n')
    // this.setState(dummyData)
    this.setState(recipeData)
    console.log(this.state)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let dataToSend = this.state
    // let formattedIngredients = this.state.ingredients.split('\n')
    // let formattedInstructions = this.state.instructions.split('\n')
    // dataToSend.ingredients = formattedIngredients
    // dataToSend.instructions = formattedInstructions
    console.log('Data To Send to DB', dataToSend)
  }

  render() {
    let recipe = this.props.recipe || {}
    console.log('recipe in render', recipe)
    return (
      <div>
        <h4>
          Edit recipe details for <em>{recipe.name}</em> below, then click
          CONFIRM when you're ready to save!
        </h4>
        <img width="250px" src={recipe.thumbnail_url || ''} />
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
  recipe: state.recipe
})

export default connect(mapState, null)(RecipeForm)
