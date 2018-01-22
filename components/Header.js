import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { browserHistory } from 'react-router';
import ShoppingCartItemAddIcon from 'material-ui-icons/ShoppingCart';
import AssignmentIcon from 'material-ui-icons/Assignment';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import BuildIcon from 'material-ui-icons/Build';
import MoneyLeft from '../components/MoneyLeft';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      margin: 0,
      padding: 0,
      minWidth: theme.spacing.unit * 5
    }
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,

  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  buttonText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
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
            color="contrast"
            onClick={() => browserHistory.push('/')}
          >
            <ShoppingCartItemAddIcon
              className={classes.buttonIcon}
            />
              <span className={classes.buttonText}>Consumptions</span>
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/categories-page')}
          >
            <AssignmentIcon
              className={classes.buttonIcon}
            />
              <span className={classes.buttonText}>Categories</span>
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/reports-page')}
          >
            <TrendingUpIcon
              className={classes.buttonIcon}
            />
              <span className={classes.buttonText}>Reports</span>
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/settings-page')}
          >
            <BuildIcon
              className={classes.buttonIcon}
            />
              <span className={classes.buttonText}>Settings</span>
          </Button>

          <MoneyLeft />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
