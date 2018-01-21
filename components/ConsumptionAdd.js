import React, { Component, PropTypes } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import backgroundImage from './../assets/images/amsterdam-xlarge.jpg'

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

class ConsumptionAdd extends Component {

  state = {
      category_id: null,
      sum: 500,
      comment: '',
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.categories) && nextProps.categories.length && !this.state.category_id) {
      this.setState({ category_id: nextProps.categories[0].id });
    }
  }

  createConsumption = (event) => {
    this.props.createConsumption(this.state.category_id, this.state.sum, this.state.comment, this.props.budget.id);
    this.props.updateMoneyLeft();
  }

  changeSum = (event) => {
    this.setState({ sum: event.target.value });
  }

  changeComment = (event) => {
    this.setState({ comment: event.target.value });
  }

  changeCategory = (event) => {
    this.setState({ category_id: event.target.value });
  }

  render() {
    const { categories, classes } = this.props
    const { category_id } = this.state

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form}>
          <FormControl className={classes.field}>
            <InputLabel>Category</InputLabel>
            <Select
              native
              value={Number(category_id)}
              onChange={this.changeCategory}
              input={<Input />}
            >
              {categories.map((item, index) => (
                <option
                  value={item.id}
                  key={item.id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.field}>
            <InputLabel>Amount</InputLabel>
            <Input
              value={this.state.sum}
              onChange={this.changeSum}
              endAdornment={<InputAdornment position="end">₽</InputAdornment>}
            />
          </FormControl>
          <FormControl className={classes.field}>
            <TextField
              style={{ textAlign: 'center' }}
              defaultValue={this.state.comment}
              onChange={this.changeComment}
              placeholder="Comment"
            />
          </FormControl>
          <Button fab color="accent" onClick={this.createConsumption} className={classes.submitBtn}>
            <AddIcon />
          </Button>
        </Paper>
      </div>
    );
  }
};

ConsumptionAdd.propTypes = {
  createConsumption: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConsumptionAdd);
