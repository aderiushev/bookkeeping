import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/createMuiTheme';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import AppTheme from '../theme';
import Header from '../components/Header';

const muiTheme = getMuiTheme(AppTheme);

const App = function ({ children }) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Paper>
        <Header />
        <div style={{ marginTop: 80 }}>
          {children}
        </div>
      </Paper>
    </MuiThemeProvider>
  );
};

export default connect(state => state)(App);
