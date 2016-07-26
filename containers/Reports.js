import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import FontIcon from 'material-ui/lib/font-icon';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import MonthlyChart from '../components/reports/MonthlyChart';
import MonthlyTable from '../components/reports/MonthlyTable';
import MonthlyConsOnCat from '../components/reports/MonthlyByCategory';
import RangeCalendar from '../components/reports/RangeCalendar';
import {connect} from 'react-redux';
import * as actions from '../actions';


class Reports extends Component {

    static propTypes = {
        reports: PropTypes.object
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.getMonthlyChart());
    }

    render() {
        const { reports } = this.props;
        console.warn(reports);
        return (
            <div>
                <RangeCalendar />
                <MonthlyChart data={reports.monthlyChart} />
                <MonthlyTable />
                <MonthlyConsOnCat />
            </div>
        )
    };
}

function mapStateToProps(state) {
    const {reports} = state;

    return {reports};
}

export default connect(mapStateToProps)(Reports);

