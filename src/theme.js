import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'


let theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(191,19,19,255)',
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });

  theme = responsiveFontSizes(theme);

  export default theme;