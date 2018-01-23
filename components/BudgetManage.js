import React, { Component, PropTypes } from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';

import {
  blue500, red500,
} from 'material-ui/colors';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    margin: '0 auto',
    padding: theme.spacing.unit * 2,
    borderRadius: 16,
    boxSizing: 'border-box'
  },
  field: {
    marginBottom: theme.spacing.unit * 2
  },
  submitBtn: {
    margin: '0 auto'
  }
});

class BudgetManage extends Component {

  state = {
    sum: null,
    comment: null
  }

  onChangeSum = (e) => {
    this.setState({ sum: e.target.value })
  }

  onChangeComment = (e) => {
    this.setState({ comment: e.target.value })
  } 

  createBudget = (event) => {
    const { createBudget, updateMoneyLeft } = this.props
    const { sum, comment } = this.state

    createBudget({ sum, comment });
    updateMoneyLeft();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.form}>

        <FormControl className={classes.field}>
          <InputLabel>Budget</InputLabel>
          <Input
            onChange={this.onChangeSum}
            startAdornment={<InputAdornment position="start">+</InputAdornment>}
          />
        </FormControl>

        <FormControl className={classes.field}>
          <TextField
            placeholder="Comment"
            onChange={this.onChangeComment}
          />
        </FormControl>

        <Button fab color="accent" onClick={this.createBudget} className={classes.submitBtn}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

BudgetManage.propTypes = {
  createBudget: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BudgetManage);
