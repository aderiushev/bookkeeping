import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import backgroundImage from './../assets/images/bar-montenegro.jpg'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    margin: '0 auto',
    padding: theme.spacing.unit * 2,
    borderRadius: 16,
    backgroundColor: theme.palette.grey['50'],
    opacity: .95
  },
  field: {
    marginBottom: theme.spacing.unit * 2
  },
  submitBtn: {
    margin: '0 auto'
  },
  wrapper: {
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: theme.spacing.unit * 2,
    backgroundPosition: '50%',
    display: 'flex',
    alignItems: 'center',
    height: 300
  }
});

class CategoryAdd extends Component {
  state = {
    name: '',
  };

  createCategory = () => {
    const { createCategory } = this.props
    const { name } = this.state

    createCategory({ name });
  };

  changeName = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form}>
          <FormControl className={classes.field}>
            <TextField
              style={{ textAlign: 'center' }}
              defaultValue={this.state.name}
              onChange={this.changeName}
              placeholder="Category name"
            />
          </FormControl>
          <Fab
            color="primary"
            onClick={this.createCategory}
            className={classes.submitBtn}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </div>
    );
  }
}

CategoryAdd.propTypes = {
  createCategory: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(CategoryAdd);
