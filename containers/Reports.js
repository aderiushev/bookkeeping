import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { withStyles } from 'material-ui/styles';
import MonthlyChart from '../components/reports/MonthlyChart';
import BudgetChart from '../components/reports/BudgetChart';
import MonthlyTable from '../components/reports/MonthlyTable';
import MonthlyByCategory from '../components/reports/MonthlyByCategory';
import RangeCalendar from '../components/reports/RangeCalendar';
import * as actions from '../actions';

const styles = theme => ({
  mobileHidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
})

class Reports extends Component {
    static propTypes = {
        reports: PropTypes.object
    };

    state = {
        dateRange: {
            startDate: moment().subtract(1, 'months').startOf('day'),
            endDate: moment()
        }
    }

    componentWillMount() {
        this.onDateChanged(this.state.dateRange)
    }

    onDateChanged = (dateRange) => {
        const { actions } = this.props
        actions.getMonthlyChart(dateRange)
        actions.getMonthlyTable(dateRange)
        actions.getMonthlyByCategory(dateRange)
        actions.getBudgetChart(dateRange)

        this.setState({ dateRange })
    }

    render() {
        const { reports, classes } = this.props;
        const { dateRange } = this.state

        return (
            <div>
                <RangeCalendar
                    onChange={this.onDateChanged}
                    {...dateRange}
                />
                <MonthlyChart
                    data={reports.monthlyChart}
                />
                <MonthlyTable
                    className={classes.mobileHidden}
                    data={reports.monthlyTable} 
                /> 
                <MonthlyByCategory
                className={classes.mobileHidden}
                    data={reports.monthlyByCategory} 
                /> 
                <BudgetChart
                    data={reports.budgetChart}
                />
            </div>
        )
    };
}

function mapStateToProps (state) {
    const { reports } = state;

    return { reports };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Reports));

