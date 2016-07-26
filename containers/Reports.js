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
        dispatch(actions.getMonthlyTable());
        dispatch(actions.getMonthlyByCategory());
    }

    render() {
        const { reports } = this.props;

        return (
            <div>
                <RangeCalendar />
                <MonthlyChart data={reports.monthlyChart} />
                <MonthlyTable data={reports.monthlyTable} />
                <MonthlyConsOnCat data={reports.monthlyByCategory}/>
            </div>
        )
    };
}

function mapStateToProps(state) {
    const {reports} = state;

    return {reports};
}

export default connect(mapStateToProps)(Reports);

