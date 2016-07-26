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

class MonthlyTable extends Component {

    render() {
        const { data } = this.props;

        return data ?
            <div>
                <h2 style={{textAlign:'center'}}>Daily Consumptions Table:</h2>
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
                        {data.rows.map((item, index) => (
                            <TableRow key={index} selected={false}>
                                <TableRowColumn>{item.date}</TableRowColumn>
                                <TableRowColumn>{item.categories}</TableRowColumn>
                                <TableRowColumn>
                                    {item.sum}
                                </TableRowColumn>
                                <TableRowColumn>{item.comments}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        :
            <div>
                <h2 style={{textAlign:'center'}}>No data</h2>
            </div>
    }
}

export default MonthlyTable