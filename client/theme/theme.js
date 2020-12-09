const Theme = {
  colors: {
    // sage: '#99c49f',
    sage: '#8FBC8B',
    grey: '#8c8c8c',
    navy: '#000a54'
  },
  breakpoints: {
    mobile: '679px',
    tablet: '1000px'
  },
  shadowed: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px'
  },
  fonts: {}
}

//look into materialUI?
// const theme2 = createMuiTheme({
//     palette: {
//       primary: {
//         main: purple[500],
//       },
//       secondary: {
//         main: green[500],
//       },
//     },
//   });

//in components, can use theme toggle as such:
// const Toggle = ({ theme, toggleTheme }) => {
//   const isLight = theme === 'light';
//   return (
//     <button onClick={toggleTheme} >
//       <SunIcon />
//       <MoonIcon />
//     </button>
//   );
// };

export default Theme
