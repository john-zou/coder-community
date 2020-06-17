import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
     },
//    secondary: {
//      main: '#19857b',
//    },
    textPrimary: {
      main: '#000000',
    },

    text: {
   main: '#000000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;