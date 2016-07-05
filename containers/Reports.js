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
                <h2 style={{textAlign:'center'}}>Daily Consumptions Chart</h2>
                <MonthlyChart />
                <h2 style={{textAlign:'center'}}>Daily Consumptions Table:</h2>
                <MonthlyTable />
                <h2 style={{textAlign:'center'}}>Consumptions on Categories</h2>
                <MonthlyConsOnCat />
            </div>
        )
    };
};

export default Reports