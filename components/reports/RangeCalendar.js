import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { Component, PropTypes } from 'react';
import { DateRangePicker } from 'react-dates';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import * as actions from '../../actions';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  calendar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }    
});

class RangeCalendar extends Component {
  state = {
    focusedInput: null
  }

  handleChange = ({ startDate, endDate }) => {
    this.props.onChange({ startDate, endDate })
  }

  render() {
    const { startDate, endDate, classes } = this.props
    const { focusedInput } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.calendar}>
          <DateRangePicker
            startDateId='startDate'
            endDateId='endDate'
            startDate={startDate}
            endDate={endDate} 
            focusedInput={focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            onDatesChange={this.handleChange}
            isOutsideRange={() => false}
            noBorder
          />
        </div>
        <div>
          <Button
            mini
            color='accent'
            onClick={() => this.handleChange({ startDate: moment().subtract(1, 'week'), endDate: moment() })}
          >
            1 week
          </Button>
          <Button
            mini
            color='accent'
            onClick={() => this.handleChange({ startDate: moment().subtract(1, 'month'), endDate: moment() })}
          >
            1 month
          </Button>
          <Button
            mini
            color='accent'
            onClick={() =>this.handleChange({ startDate: moment().subtract(3, 'month'), endDate: moment() })}
          >
            3 months
          </Button>
          <Button
            mini
            color='accent'
            onClick={() => this.handleChange({ startDate: moment().subtract(6, 'month'), endDate: moment() })}
          >
            6 months
          </Button>
          <Button
            mini
            color='accent'
            onClick={() => this.handleChange({ startDate: moment().subtract(1, 'year'), endDate: moment() })}
          >
            1 year
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RangeCalendar);
