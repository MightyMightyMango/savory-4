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

h1 {
  padding-bottom: 20px;
  font-family: 'Oswald', sans serif;
}

h2, h3, h4, h5, h6 {
  padding-bottom: 20px;
  font-weight: 700;
}

a {
  text-decoration: none;
  transition-duration: 0.4s;
}

label {
  display: block;
}

b {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
}

ul {
  list-style-type: none;
}

li {
  list-style-type: none;
}

img {
  border:none;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  text-align: left;
}

.fade-appear,
.fade-enter {
    opacity: 0;
    z-index: 1;
}
.fade-appear-active,
.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms linear 150ms;
}

.fade-exit {
    opacity: 1;
}

.fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 150ms linear;
}

.showconfirmation-enter {
  opacity: 0;
  transform: scale(0.9);
}
.showconfirmation-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}
.showconfirmation-exit {
  opacity: 1;
}
.showconfirmation-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}

`

//can also keep any styled components here that are the same globally,

export default GlobalStyle
