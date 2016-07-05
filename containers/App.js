import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import Paper from 'material-ui/lib/paper';
import {connect} from 'react-redux';
import AppTheme from '../theme';
import Header from '../components/Header'
const muiTheme = getMuiTheme(AppTheme);

const App = function({ children }) {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Paper>
                <Header />
                <div>{children}</div>
            </Paper>
        </MuiThemeProvider>
    )
};

export default connect(state => state)(App);