import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft, submitRecipe, getUserDraft} from '../store/singleRecipe'

const RecipeForm = props => {
  return (
    <div>
      <h4>
        Recipe Saved! You can view it in your drafts or make edits below and
        press 'confirm' when you're done.
        {/* Edit recipe details for <em>{recipe.name}</em> below, then click */}
      </h4>
      <img width="250px" src={props.recipe.imageUrl} />
      <h6>Recipe Collected From: {props.recipe.url} </h6>
      <form>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="name"
          value={props.recipe.name}
          onChange={props.handleChange}
        />

        <label>Published By:</label>
        <input
          type="text"
          name="publisher"
          value={props.recipe.publisher}
          onChange={props.handleChange}
        />
        <label>Source URL:</label>
        <input
          type="text"
          name="url"
          value={props.recipe.url}
          onChange={props.handleChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={props.recipe.imageUrl}
          onChange={props.handleChange}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={props.recipe.description}
          onChange={props.handleChange}
        />

        <label>Prep Time:</label>
        <input
          type="text"
          name="prepTime"
          value={props.recipe.prepTime}
          onChange={props.handleChange}
        />

        <label>Cook Time:</label>
        <input
          type="text"
          name="cookTime"
          value={props.recipe.cookTime}
          onChange={props.handleChange}
        />

        <label>Yield:</label>
        <input
          type="text"
          name="yield"
          value={props.recipe.yield}
          onChange={props.handleChange}
        />

        <label>
          Ingredients (Please list one ingredient per line, with no additional
          spacing)
        </label>
        <textarea
          cols="60"
          rows="20"
          type="textarea"
          name="ingredients"
          value={props.recipe.ingredients}
          onChange={props.handleChange}
        />

        <label>
          Instructions (Please list one instruction per line, with no additional
          spacing)
        </label>
        <textarea
          cols="60"
          rows="20"
          type="textarea"
          name="instructions"
          value={props.recipe.instructions}
          onChange={props.handleChange}
        />
      </form>
    </div>
  )
}

export default RecipeForm
