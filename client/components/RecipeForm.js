import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe, getUserDraft} from '../store/singleRecipe'

// const defaultState = {
//   url: '',
//   name: 'string',
//   alt_headline: '',
//   thumbnail_url: '',
//   publisher_name: '',
//   ingredients: [],
//   instructions: [],
//   yield: '',
//   prepTime: '',
//   categories: [],
//   userId: ''
// }

const RecipeForm = props => {
  let recipe = props.recipeDraft
  console.log(recipe)
  return (
    <div>
      <h4>
        Recipe Saved! You can view it in your drafts or press confirm below to
        save it to permanent recipes. Make edits if u want ;)
        {/* Edit recipe details for <em>{recipe.name}</em> below, then click */}
      </h4>
      <img width="250px" src={recipe.imageUrl} />
      <h6>Recipe Collected From: {recipe.url} </h6>
      <form onSubmit={props.handleSubmit}>
        <button type="submit">Confirm Changes</button>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={props.handleChange}
        />

        <label>Published By:</label>
        <input
          type="text"
          name="publisher_name"
          value={recipe.publisher_name}
          onChange={props.handleChange}
        />
        <label>Source URL:</label>
        <input
          type="text"
          name="url"
          value={recipe.url}
          onChange={props.handleChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="thumbnail_url"
          value={recipe.thumbnail_url}
          onChange={props.handleChange}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="alt_headline"
          value={recipe.alt_headline}
          onChange={props.handleChange}
        />

        <label>Prep Time:</label>
        <input
          type="text"
          name="prepTime"
          value={recipe.prepTime}
          onChange={props.handleChange}
        />

        <label>Cook Time:</label>
        <input
          type="text"
          name="cookTime"
          value={recipe.cookTime}
          onChange={props.handleChange}
        />

        <label>Yield:</label>
        <input
          type="text"
          name="yield"
          value={recipe.yield}
          onChange={props.handleChange}
        />

        <label>Ingredients:</label>
        <textarea
          cols="60"
          rows="20"
          type="textarea"
          name="ingredients"
          value={recipe.ingredients}
          onChange={props.handleChange}
        />

        <label>Instructions</label>
        <textarea
          cols="60"
          rows="20"
          type="textarea"
          name="instructions"
          value={recipe.instructions}
          onChange={props.handleChange}
        />
      </form>
    </div>
  )
}

export default RecipeForm
