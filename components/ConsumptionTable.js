import React, { PropTypes, Component } from 'react';
import Table, { TableHeaderColumn, TableRow, TableHead, TableCell, TableBody } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const ConsumptionTable = React.createClass({

  getInitialState() {
    return {
      isToolbarOpen: false,
      toolbarAnchorEl: null,
      toolbarConsumption: {
        id: null, sum: null, comment: null, date: null,
      },
    };
  },

  handleToolbarOpen(event, rowIndex) {
    this.setState({
      isToolbarOpen: true,
      toolbarAnchorEl: event.target,
      toolbarConsumption: { ...this.props.consumptions[rowIndex] },
    });
  },

  handleToolbarClose(event) {
    this.setState({
      isToolbarOpen: false,
      toolbarConsumption: { id: null, sum: null, date: null },
    });
  },

  deleteConsumption() {
    this.props.deleteConsumption(this.state.toolbarConsumption.id);
    this.props.updateMoneyLeft();
    this.handleToolbarClose();
  },

  updateConsumption(event) {
    this.props.updateConsumption(this.state.toolbarConsumption.id, this.state.toolbarConsumption.sum, this.state.toolbarConsumption.comment);
    this.props.updateMoneyLeft();
    this.handleToolbarClose();
  },

  changeSum(event) {
    const toolbarConsumption = this.state.toolbarConsumption;
    toolbarConsumption.sum = event.target.value;
    this.setState({ toolbarConsumption });
  },

  changeComment(event) {
    const toolbarConsumption = this.state.toolbarConsumption;
    toolbarConsumption.comment = event.target.value;
    this.setState({ toolbarConsumption });
  },

  render() {
    const { consumptions } = this.props;
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>
          List of last 20 Consumptions
        </h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip="ID">ID</TableCell>
              <TableCell tooltip="Name">Name</TableCell>
              <TableCell tooltip="Amount">Amount</TableCell>
              <TableCell tooltip="Comment">Comment</TableCell>
              <TableCell tooltip="Date">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consumptions.map((consumption, index) =>
              <TableRow key={index}>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {consumption.id}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {consumption.name}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {consumption.sum}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {consumption.comment}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {consumption.date}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Popover
          open={this.state.isToolbarOpen}
          onClose={this.handleToolbarClose}
          anchorEl={this.state.toolbarAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <p style={{ fontSize: 11, textAlign: 'center' }}>Consumption: ID {this.state.toolbarConsumption.id}</p>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <TextField inputStyle={{ textAlign: 'center' }} value={this.state.toolbarConsumption.sum} onChange={this.changeSum} hintText="Sum" style={{ width: 100 }} />
            <br />
            <TextField inputStyle={{ textAlign: 'center' }} value={this.state.toolbarConsumption.comment} onChange={this.changeComment} hintText="Comment" style={{ width: 100 }} />
          </div>
          <div>
            <Button
              raised
              style={{ margin: 12 }}
              onClick={this.updateConsumption}
            >
              Edit
            </Button>
            <Button
              raised 
              style={{ margin: 12 }}
              onClick={this.deleteConsumption}
            >
              Remove
            </Button>
          </div>
        </Popover>
      </div>
    );
  },
});

export default ConsumptionTable;
