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

const MonthlyByCategory = React.createClass({

    getInitialState: function() {
        let tableRows = [];

        $.ajax({
            url: '/monthly-by-category',
            type: 'GET',
            async: false,
            success: function(data) {
                tableRows = data;
            }
        });

        return {
            tableRows: tableRows
        };
    },

    render() {
        let max = 0;

        this.state.tableRows.map(function(item, index) {
            max += item.sum;
        });

        return (
            <div>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                         <TableRow >
                            <TableHeaderColumn tooltip="Category">Category</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Sum">Sum</TableHeaderColumn>
                             <TableHeaderColumn tooltip="Percentage">Percentage</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {this.state.tableRows.map((item, index) => (
                            <TableRow key={index} selected={false}>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.sum}</TableRowColumn>
                                <TableRowColumn>{((item.sum * 100) / max).toFixed(1)}%</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
});

export default MonthlyByCategory