import React, { Component, PropTypes } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui-icons/Add';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
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
    name: ''
  }

  createCategory = event => {
    const { createCategory } = this.props
    const { name } = this.state

    createCategory({ name });
  }

  changeName = event => {
    this.setState({ name: event.target.value });
  }

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
          <Button
            fab
            color="accent"
            onClick={this.createCategory}
            className={classes.submitBtn}
          >
            <AddIcon />
          </Button>
        </Paper>
      </div>
    );
  }
}

CategoryAdd.propTypes = {
  createCategory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryAdd);
