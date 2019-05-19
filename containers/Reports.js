import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { withStyles } from '@material-ui/core/styles';
import ConsumptionCategoryPieChart from '../components/reports/ConsumptionCategoryPieChart';
import TotalSpent from '../components/reports/TotalSpent';
import RangeCalendar from '../components/reports/RangeCalendar';
import * as actions from '../actions';

const styles = theme => ({
  row: {
    display: 'flex',
  }
});

class Reports extends Component {
  static propTypes = {
    reports: PropTypes.shape(),
    classes: PropTypes.shape(),
  };

  state = {
    dateRange: {
      startDate: moment().subtract(1, 'months').startOf('day'),
      endDate: moment()
    }
  };

  componentDidMount() {
    const { actions } = this.props;
    const { dateRange } = this.state;

    actions.getChartsData(dateRange);
  }

  onDateChanged = (dateRange) => {
    const { actions } = this.props;

    actions.getChartsData(dateRange).then(() => {
      this.setState({ dateRange });
    });
  };

  render() {
    const { report, classes } = this.props;
    const { dateRange } = this.state;

    return (
      <div>
        <RangeCalendar
          onChange={this.onDateChanged}
          {...dateRange}
        />

        <div className={classes.row}>
          <ConsumptionCategoryPieChart
            data={report.categoryConsumptionSum}
          />

          <TotalSpent
            data={report.totalSpent}
          />
        </div>
      </div>
    )
  };
}

function mapStateToProps (state) {
    const { report } = state;

    return { report };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Reports.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Reports));

