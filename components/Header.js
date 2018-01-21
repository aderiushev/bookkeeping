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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar
        titleStyle={{ paddingLeft: 30 }}
      >
        <Toolbar>
          <Typography type="title" color="inherit">
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
              Consumptions
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/categories-page')}
          >
            <AssignmentIcon
              className={classes.buttonIcon}
            />
              Categories
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/reports-page')}
          >
            <TrendingUpIcon
              className={classes.buttonIcon}
            />
              Reports
          </Button>
          <Button
            className={classes.button}
            color="contrast"
            onClick={() => browserHistory.push('/settings-page')}
          >
            <BuildIcon
              className={classes.buttonIcon}
            />
              Settings
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
