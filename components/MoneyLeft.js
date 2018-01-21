import React, { Component, PropTypes } from 'react';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import WalletIcon from 'material-ui-icons/AccountBalanceWallet';
import {
  blue500, red500,
} from 'material-ui/colors';
import * as actions from '../actions';

const styles = theme => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    right: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  icon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing.unit
  },
});

const MoneyLeft = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.updateMoneyLeft());
  },

  render() {
    const { moneyLeft, classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <WalletIcon className={classes.icon} />
        <Typography type="title" color="accent">
          {`${parseInt(moneyLeft)} ₽`}
        </Typography>
      </Paper>
    );
  },
});

MoneyLeft.propTypes = {
  moneyLeft: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    moneyLeft: state.moneyLeft,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoneyLeft));
