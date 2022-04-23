import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(191,19,19,255)',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
console.log(theme)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ThemeProvider theme={theme}>
        <App /> 
    </ThemeProvider>
);

