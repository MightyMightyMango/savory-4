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
      <form onSubmit={props.handleSubmit}>
        <button type="submit">Confirm Changes</button>
        <label>RECIPE NAME:</label>
        <input
          type="text"
          name="name"
          value={props.recipe.name}
          onChange={props.handleChange}
        />

        <label>PUBLISHED BY:</label>
        <input
          type="text"
          name="publisher"
          value={props.recipe.publisher}
          onChange={props.handleChange}
        />
        <label>SOURCE URL:</label>
        <input
          type="text"
          name="url"
          value={props.recipe.url}
          onChange={props.handleChange}
        />
        <label>IMAGE URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={props.recipe.imageUrl}
          onChange={props.handleChange}
        />
        <label>DESCRIPTION:</label>
        <textarea
          type="text"
          name="description"
          value={props.recipe.description}
          onChange={props.handleChange}
        />

        <label>PREP TIME:</label>
        <input
          type="text"
          name="prepTime"
          value={props.recipe.prepTime}
          onChange={props.handleChange}
        />

        <label>COOK TIME:</label>
        <input
          type="text"
          name="cookTime"
          value={props.recipe.cookTime}
          onChange={props.handleChange}
        />

        <label>YIELD:</label>
        <input
          type="text"
          name="yield"
          value={props.recipe.yield}
          onChange={props.handleChange}
        />

        <label>INGREDIENTS</label>
        <div className="recipe-form-span">
          (Please list one ingredient per line, with no additional spacing)
        </div>
        <textarea
          cols="60"
          rows="20"
          type="textarea"
          name="ingredients"
          value={props.recipe.ingredients}
          onChange={props.handleChange}
        />

        <label>INSTRUCTIONS</label>
        <div className="recipe-form-span">
          (Please list one instruction per line, with no additional spacing)
        </div>
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
