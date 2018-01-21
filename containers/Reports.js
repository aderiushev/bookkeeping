import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import MonthlyChart from '../components/reports/MonthlyChart';
import BudgetChart from '../components/reports/BudgetChart';
import MonthlyTable from '../components/reports/MonthlyTable';
import MonthlyByCategory from '../components/reports/MonthlyByCategory';
import RangeCalendar from '../components/reports/RangeCalendar';
import * as actions from '../actions';


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
        const { reports } = this.props;
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
                    data={reports.monthlyTable}
                />
                <MonthlyByCategory
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);

