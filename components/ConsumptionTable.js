import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  mobileHiddenCol: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

class CustomPopover extends Component {
  state = {
    isDeleteCoverVisible: false
  };

  onDeleteClick = () => {
    this.setState({ isDeleteCoverVisible: true })
  };

  onConfirmDeleteClick = () => {
    const { deleteConsumption } = this.props

    this.confirmationClose();

    deleteConsumption()
  };

  confirmationClose = () => {
    this.setState({ isDeleteCoverVisible: false })
  };

  onClose = () => {
    const { handleToolbarClose } = this.props

    this.confirmationClose();

    handleToolbarClose()
  };

  render () {
    const {
      consumption,
      isToolbarOpen,
      toolbarAnchorEl,
      updateConsumption,
      changeSum,
      changeComment
    } = this.props;
    const { isDeleteCoverVisible } = this.state

    return (
      <Popover
        open={isToolbarOpen}
        onClose={this.onClose}
        anchorEl={toolbarAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        {isDeleteCoverVisible
          ?
            <div>
              <p style={{ textAlign: 'center' }}>Are you sure?</p>
              <Button
                raised
                style={{ margin: 12 }}
                onClick={this.confirmationClose}
              >
                Back
              </Button>
              <Button
                raised
                color="accent"
                style={{ margin: 12 }}
                onClick={this.onConfirmDeleteClick}
              >
                Yes
              </Button>

            </div>
          :
            <div>
              <p style={{ fontSize: 11, textAlign: 'center' }}>Consumption: ID {consumption.id}</p>
              <Divider />
              <div style={{ textAlign: 'center' }}>
                <TextField inputStyle={{ textAlign: 'center' }} value={consumption.sum} onChange={changeSum} hintText="Sum" style={{ width: 100 }} />
                <br />
                <TextField inputStyle={{ textAlign: 'center' }} value={consumption.comment} onChange={changeComment} hintText="Comment" style={{ width: 100 }} />
              </div>
              <div>
                <Button
                  raised
                  style={{ margin: 12 }}
                  onClick={this.onDeleteClick}
                >
                  Remove
                </Button>
                <Button
                  color="accent"
                  raised
                  style={{ margin: 12 }}
                  onClick={updateConsumption}
                >
                  Edit
                </Button>
              </div>
            </div>
        }
      </Popover>
    )
  }
}

class ConsumptionTable extends Component {
  state = {
    isToolbarOpen: false,
    toolbarAnchorEl: null,
    toolbarConsumption: {
      id: null, sum: null, comment: null, date: null,
    }
  };

  handleToolbarOpen = (event, rowIndex) => {
    this.setState({
      isToolbarOpen: true,
      toolbarAnchorEl: event.target,
      toolbarConsumption: { ...this.props.consumptions[rowIndex] },
    });
  };

  handleToolbarClose = () => {
    this.setState({
      isToolbarOpen: false,
      toolbarConsumption: { id: null, sum: null, date: null },
    });
  };

  deleteConsumption = () => {
    const { toolbarConsumption } = this.state
    this.props.deleteConsumption(toolbarConsumption.id);
    this.props.updateMoneyLeft();
    this.handleToolbarClose();
  };

  updateConsumption = () => {
    const { updateMoneyLeft, updateConsumption } = this.props
    const { toolbarConsumption }  = this.state

    updateConsumption(toolbarConsumption.id, {
      sum: toolbarConsumption.sum,
      comment: toolbarConsumption.comment
    }).then(() => {
      updateMoneyLeft()
    })
    ;
    this.handleToolbarClose();
  };

  changeSum = event => {
    const { toolbarConsumption } = this.state

    const updatedToolbarConsumption = {
      ...toolbarConsumption,
      sum: event.target.value
    }

    this.setState({ toolbarConsumption: updatedToolbarConsumption });
  };

  changeComment = event => {
    const toolbarConsumption = this.state.toolbarConsumption;
    toolbarConsumption.comment = event.target.value;
    this.setState({ toolbarConsumption });
  };

  render () {
    const { consumptions, className, classes } = this.props;
    const { toolbarConsumption, isToolbarOpen, toolbarAnchorEl } = this.state

    return (
      <div className={className}>
        <h3 style={{ textAlign: 'center' }}>
          List of last 200 Consumptions
        </h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip="ID" className={classes.mobileHiddenCol}>ID</TableCell>
              <TableCell tooltip="Name">Name</TableCell>
              <TableCell tooltip="Amount">Amount</TableCell>
              <TableCell tooltip="Comment" className={classes.mobileHiddenCol}>Comment</TableCell>
              <TableCell tooltip="Date" className={classes.mobileHiddenCol}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consumptions.map((consumption, index) =>
              <TableRow key={index}>
                <TableCell
                  onClick={(e) => this.handleToolbarOpen(e, index)}
                  className={classes.mobileHiddenCol}
                >
                  {consumption.id}
                </TableCell>
                <TableCell
                  onClick={(e) => this.handleToolbarOpen(e, index)}
                >
                  {consumption.name}
                </TableCell>
                <TableCell
                  onClick={(e) => this.handleToolbarOpen(e, index)}
                >
                  {consumption.sum}
                </TableCell>
                <TableCell
                  onClick={(e) => this.handleToolbarOpen(e, index)}
                  className={classes.mobileHiddenCol}
                >
                  {consumption.comment}
                </TableCell>
                <TableCell
                  onClick={(e) => this.handleToolbarOpen(e, index)}
                  className={classes.mobileHiddenCol}
                >
                  {consumption.date}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomPopover
          consumption={toolbarConsumption}
          isToolbarOpen={isToolbarOpen}
          handleToolbarClose={this.handleToolbarClose}
          toolbarAnchorEl={toolbarAnchorEl}
          deleteConsumption={this.deleteConsumption}
          updateConsumption={this.updateConsumption}
          changeSum={this.changeSum}
          changeComment={this.changeComment}
        />
      </div>
    );
  }
}

ConsumptionTable.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(ConsumptionTable);
