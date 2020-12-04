import React from 'react'
import {connect} from 'react-redux'
import {setRecipeDraft} from '../store/singleRecipe'
import history from '../history'
import styled from 'styled-components'
import {render} from 'enzyme'
import RecipeForm from './RecipeForm'

export class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmitted: false
    }
  }

  async submitUrl(event) {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    await this.props.getSingleRecipe(url, this.props.user.id)
    // document.getElementById('url-input').value = ' '
    this.setState({...this.state, isSubmitted: true})
  }

  render() {
    console.log('this.props in Recipe.js', this.props.recipe)
    return (
      <>
        <Container>
          <Title>Enter Recipe Url:</Title>
          <Form>
            <input type="text" id="url-input" />
          </Form>
          <button type="submit" onClick={() => this.submitUrl(event)}>
            Get Recipe
          </button>
          {this.state.isSubmitted && <RecipeForm recipe={this.props.recipe} />}
        </Container>
      </>
    )
  }
}

const mapState = state => ({
  recipe: state.recipe,
  user: state.user
})

const mapDispatch = dispatch => ({
  getSingleRecipe: (url, userId) => {
    dispatch(setRecipeDraft(url, userId))
  }
})

export default connect(mapState, mapDispatch)(Recipe)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 87vh;
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`
const Form = styled.form`
  display: flex;
  justify-contents: center;
  align-items: center;
`
