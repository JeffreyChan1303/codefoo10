import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
        <ThemeProvider theme={theme}>
                <App /> 
        </ThemeProvider>
);

