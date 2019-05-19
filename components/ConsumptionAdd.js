import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl  from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
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
  },
  gifImg: {
    width: 300,
    height: 200,
    backgroundSize: 'cover',
    position: 'fixed',
    left: 0,
    right: 0,
    borderRadius: theme.spacing.unit,
    zIndex: 9999,
    margin: '0 auto'
  }
});

class ConsumptionAdd extends Component {

  static defaultProps = {
    categories: []
  };

  state = {
    category_id: '',
    sum: '',
    comment: '',
    gifImageUrl: null
  };

  createConsumption = () => {
    const { createConsumption, getGiphy } = this.props;
    const { category_id, sum, comment } = this.state;

    createConsumption({ category_id, sum, comment })
    .then(() => {
      this.setState({
        category_id: '',
        sum: '',
        comment: '',
      });
      getGiphy().then(response => {
        let gifUrl = null;
        try {
          gifUrl = response.body.data.fixed_width_downsampled_url
        } catch (error) {
          console.error('unable to get GIF', error);
          return;
        }

        this.setState({ gifImageUrl: gifUrl });

        setTimeout(() => {
          this.setState({ gifImageUrl: null });
        }, 3000)
      })
    })
  };

  changeSum = e => {
    this.setState({ sum: e.target.value });
  };

  changeComment = event => {
    this.setState({ comment: event.target.value });
  };

  changeCategory = e => {
    this.setState({ category_id: e.target.value });
  };

  render() {
    const { categories, classes } = this.props;
    const { category_id, comment, sum, gifImageUrl } = this.state;

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form}>
          <FormControl className={classes.field}>
            <InputLabel shrink htmlFor="category">
              Category
            </InputLabel>
            <Select
              label="Category"
              placeholder="Select the category"
              value={category_id}
              onChange={this.changeCategory}
              input={<Input name="category" id="category" />}
              name="category"
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((item) => (
                <MenuItem
                  value={item.id}
                  key={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.field}>
            <InputLabel>Amount</InputLabel>
            <Input
              value={sum}
              onChange={this.changeSum}
              endAdornment={<InputAdornment position="end">₽</InputAdornment>}
            />
          </FormControl>
          <FormControl className={classes.field}>
            <TextField
              style={{ textAlign: 'center' }}
              value={comment}
              onChange={this.changeComment}
              placeholder="Comment"
            />
          </FormControl>
          <Fab onClick={this.createConsumption} className={classes.submitBtn} color="primary">
            <AddIcon />
          </Fab>
        </Paper>
        {gifImageUrl &&
          <div className={classes.gifImg} style={{ backgroundImage: `url(${gifImageUrl})`}} />
        }
      </div>
    );
  }
}

ConsumptionAdd.propTypes = {
  createConsumption: PropTypes.func.isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  classes: PropTypes.shape().isRequired
};

ConsumptionAdd.defaultProps = {
  categories: [],
};

export default withStyles(styles)(ConsumptionAdd);
