import React from 'react'

const EditCategories = props => {
  return (
    <div>
      <h4>Edit your Recipe books below.</h4>
      <h4>Add a new book:</h4>
      <form onSubmit={props.handleSubmit}>
        <label>Recipe Book Name:</label>
        <input
          type="text"
          name="name"
          value={props.newCategory}
          onChange={props.handleChange}
        />
        <button type="submit">Add Recipe Book</button>
      </form>
    </div>
  )
}

export default EditCategories
