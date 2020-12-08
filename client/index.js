import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import './socket'

import {ThemeProvider} from 'styled-components'
import GlobalStyle from './theme/GlobalStyle'
import Theme from './theme/theme'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
