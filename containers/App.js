import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Header from '../components/Header';


const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const App = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <Paper>
      <Header />
      <div style={{ marginTop: 80 }}>
        {children}
      </div>
    </Paper>
  </MuiThemeProvider>
);

export default App;
