import React, { Component, PropTypes } from 'react';
import Table, { TableCell, TableRow, TableHead, TableBody } from 'material-ui/Table';
import {
  green500,
  red500,
} from 'material-ui/colors';


class MonthlyByCategory extends Component {
  render() {
    const { data } = this.props;
    let max = 0;

    if (data) {
      data.forEach(item => max += item.sum);
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Consumptions on Categories</h2>
        {data && !!data.length
          ?
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell tooltip="Category">Category</TableCell>
                  <TableCell tooltip="Sum">Sum</TableCell>
                  <TableCell tooltip="Percentage">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) =>
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sum}</TableCell>
                    <TableCell>{((item.sum * 100) / max).toFixed(1)}%</TableCell>
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

export default MonthlyByCategory;
