import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

html, body {
  width:100%;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  height: 100vh;
  font-size: 1em;
  scrollbar-width: thin;
  letter-spacing: 0.0625em;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  transition-duration: 0.4s;
}

label {
  display: block;
}

`

//can also keep any styled components here that are the same globally,

export default GlobalStyle
