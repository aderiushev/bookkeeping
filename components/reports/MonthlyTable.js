import React, { Component, PropTypes } from 'react';
import Table, { TableHeaderColumn, TableRow, TableHead, TableCell, TableBody } from 'material-ui/Table';
import {
  green500,
  red500,
} from 'material-ui/colors';

class MonthlyTable extends Component {
  render() {
    const { data, className } = this.props;

    return (
      <div className={className}>
        <h2 style={{ textAlign: 'center' }}>
          Daily Consumptions Table:
        </h2>
        {data && !!data.length
          ?
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell tooltip="Date">Date</TableCell>
                  <TableCell tooltip="Categories">Categories</TableCell>
                  <TableCell tooltip="Sum">Sum</TableCell>
                  <TableCell tooltip="Comments">Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) =>
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.categories}</TableCell>
                    <TableCell>
                      {item.sum}
                    </TableCell>
                    <TableCell>{item.comments}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          :
            <div>
              <h2 style={{ textAlign: 'center' }}>No data</h2>
            </div>
        }
      </div>
    )
  }
}

export default MonthlyTable;
