import React, { Component, PropTypes } from 'react'
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import FontIcon from 'material-ui/lib/font-icon';
import {
    green500,
    red500
} from 'material-ui/lib/styles/colors';

import $ from 'jquery';

const MonthlyTable = React.createClass({

    componentDidMount() {
        this.setState({
            budgetPerDayLeft: parseInt(this.context.store.getState().moneyLeft / this.state.month.days_left)
        });
    },

    getInitialState: function() {
        let tableRows = [];
        let budgetPerDay = 0;
        let month = {};

        $.ajax({
            url: '/current-budget-per-day',
            type: 'GET',
            async: false,
            success: function(data) {
                budgetPerDay = data;
            }
        });

        $.ajax({
            url: '/monthly-table',
            type: 'GET',
            async: false,
            success: function(data) {
                tableRows = data;
            }
        });

        $.ajax({
            url: '/month',
            type: 'GET',
            async: false,
            success: function(data) {
                month = data;
            }
        });

        return {
            tableRows: tableRows,
            budgetPerDay: budgetPerDay,
            month: month
        };
    },

    getRate: function(sum) {
        if (this.state.budgetPerDay > sum) {
            return (<FontIcon color={green500} className="material-icons">thumb_up</FontIcon>);
        }
        else if (this.state.budgetPerDay < sum) {
            return (<FontIcon color={red500} className="material-icons">thumb_down</FontIcon>);
        }
    },

    render() {
        return (
            <div>
                <h3 style={{textAlign:'center'}}>
                    <strong>Consumptions per day: {this.state.budgetPerDay} -> {this.state.budgetPerDayLeft}</strong>
                </h3>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Categories">Categories</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sum">Sum</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Comments">Comments</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {this.state.tableRows.map((item, index) => (
                            <TableRow key={index} selected={false}>
                                <TableRowColumn>{item.date}</TableRowColumn>
                                <TableRowColumn>{item.categories}</TableRowColumn>
                                <TableRowColumn>
                                    {item.sum}&nbsp;
                                    {this.getRate(item.sum)}
                                </TableRowColumn>
                                <TableRowColumn>{item.comments}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
});

MonthlyTable.contextTypes = {
    store: React.PropTypes.object,
    muiTheme: React.PropTypes.object
};

export default MonthlyTable