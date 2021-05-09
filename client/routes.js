import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Homepage,
  Recipe,
  RecipeForm,
  AllRecipes,
  SingleRecipe,
  AllDrafts,
  LoginSignup,
  MyBooks,
  Footer,
  NotFound,
  Loader,
  Contact
} from './components'
import ScrapeError from './components/ScrapeError'
import NotAccepted from './components/NotAccepted'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        {/* available to all users */}
        {/* <Route path="/loginsignup" component={LoginSignup} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/contact" component={Contact} />
        {isLoggedIn && (
          <Switch>
            {/* only available after logging in */}
            <Route exact path="/recipes" component={Recipe} />
            <Route path="/recipeform" component={RecipeForm} />
            <Route path="/myrecipes" component={AllRecipes} />
            <Route path="/home" component={UserHome} />
            <Route path="/drafts" component={AllDrafts} />
            <Route path="/books" component={MyBooks} />
            <Route path="/error" component={ScrapeError} />
            <Route path="/notaccepted" component={NotAccepted} />

            <Route
              path="/recipes/:recipeId"
              render={routeProps => <SingleRecipe {...routeProps} />}
            />
          </Switch>
        )}
        {/* DEFAULT COMPONENT FOR UNKNOWN PATHS */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
