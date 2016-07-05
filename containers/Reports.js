import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import FontIcon from 'material-ui/lib/font-icon';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import MonthlyChart from '../components/reports/MonthlyChart';
import MonthlyTable from '../components/reports/MonthlyTable';
import MonthlyConsOnCat from '../components/reports/MonthlyByCategory';
import RangeCalendar from '../components/reports/RangeCalendar';

class Reports extends Component {
    render() {
        return (
            <div>
                <RangeCalendar />
                <MonthlyChart />
                <MonthlyTable />
                <MonthlyConsOnCat />
            </div>
        )
    };
};

export default Reports