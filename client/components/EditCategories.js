import React from 'react'
import styled from 'styled-components'
import {StyledButton} from '../theme/Button'

const EditCategories = props => {
  return (
    <>
      {props.add ? (
        <h4>
          Enter the name of your book and check off which of your saved recipes
          you would like to include.
        </h4>
      ) : (
        <h4>Check off which recipes you would like to add to this book.</h4>
      )}
      <form onSubmit={props.handleSubmit}>
        {props.add && (
          <>
            <label>Recipe Book Name:</label>
            <input
              type="text"
              name="name"
              value={props.newCategory}
              onChange={props.handleChange}
            />
          </>
        )}
        {props.recipes.map(item => (
          <Li key={'i' + item.id}>
            <input
              type="checkbox"
              name={item.name}
              id={item.id}
              onChange={props.onChange}
            />
            <label htmlFor={item.name}>{item.name}</label>
          </Li>
        ))}
        <StyledButton type="submit">
          {props.add ? 'Add Recipe Book' : 'Update Recipe Book'}
        </StyledButton>
      </form>
    </>
  )
}

export default EditCategories

const Li = styled.div`
  display: -webkit-box;

  input[type='checkbox'] {
    margin-top: 12px;
    margin-right: 7px;
    margin-bottom: 10px;
  }
  label {
    text-align: left;
  }
`
