import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router-dom';
import ShoppingCartItemAddIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      margin: 0,
      padding: 0,
      minWidth: theme.spacing.unit * 5,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,

  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0,
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttonText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography type="title" color="inherit" className={classes.title}>
            Bookkeeping Service
          </Typography>

          <Button
            className={classes.button}
            onClick={() => browserHistory.push('/')}
          >
            <ShoppingCartItemAddIcon
              className={classes.buttonIcon}
            />
            <span className={classes.buttonText}>Consumptions</span>
          </Button>
          <Button
            className={classes.button}
            onClick={() => browserHistory.push('/categories-page')}
          >
            <AssignmentIcon
              className={classes.buttonIcon}
            />
            <span className={classes.buttonText}>Categories</span>
          </Button>
          <Button
            className={classes.button}
            onClick={() => browserHistory.push('/reports-page')}
          >
            <TrendingUpIcon
              className={classes.buttonIcon}
            />
            <span className={classes.buttonText}>Reports</span>
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Header);
