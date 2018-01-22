import React, { PropTypes, Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableHeaderColumn, TableRow, TableHead, TableCell, TableBody } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  mobileHiddenCol: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
})


class BudgetTable extends Component {
  state = {
    isToolbarOpen: false,
    toolbarAnchorEl: null,
    toolbarBudget: { id: null, sum: null, comment: null, date: null },
  }

  handleToolbarOpen = (event, rowIndex) => {
    this.setState({
      isToolbarOpen: true,
      toolbarAnchorEl: event.target,
      toolbarBudget: this.props.budgets[rowIndex],
    });
  }

  handleToolbarClose = (event) => {
    this.setState({
      isToolbarOpen: false,
      toolbarBudget: { id: null, sum: null, comment: null },
    });
  }

  deleteBudget = () => {
    this.props.deleteBudget(this.state.toolbarBudget.id);
    this.handleToolbarClose();
  }

  updateBudget = (event) => {
    const { updateBudget } = this.props
    const { toolbarBudget } = this.state

    updateBudget(
      toolbarBudget.id,
      {
        sum: toolbarBudget.sum,
        comment: toolbarBudget.comment
      }
    );
    this.handleToolbarClose();
  }

  changeComment = (event) => {
    this.setState({
      toolbarBudget: {
        id: this.state.toolbarBudget.id,
        sum: this.state.toolbarBudget.sum,
        comment: event.target.value,
        date: this.state.toolbarBudget.date
      }
    });
  }

  changeSum = (event) => {
    this.setState({
      toolbarBudget: {
        id: this.state.toolbarBudget.id,
        sum: event.target.value,
        comment: this.state.toolbarBudget.comment,
        date: this.state.toolbarBudget.date
      }
    });
  }

  render() {
    const { budgets, classes } = this.props;

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>
          Budgets
        </h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip="ID">ID</TableCell>
              <TableCell tooltip="Sum">Sum</TableCell>
              <TableCell tooltip="Comment" className={classes.mobileHiddenCol}>Comment</TableCell>
              <TableCell tooltip="Date" className={classes.mobileHiddenCol}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((item, index) =>
              <TableRow key={index}>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {item.id}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {item.sum}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)} className={classes.mobileHiddenCol}>
                  {item.comment}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)} className={classes.mobileHiddenCol}>
                  {item.date}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Popover
          onClose={this.handleToolbarClose}
          open={this.state.isToolbarOpen}
          anchorEl={this.state.toolbarAnchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <p style={{ fontSize: 11, textAlign: 'center' }}>Budget: ID {this.state.toolbarBudget.id}</p>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <TextField
              value={this.state.toolbarBudget.sum}
              onChange={this.changeSum}
              hintText="Sum"
              style={{ width: 100 }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <TextField
              value={this.state.toolbarBudget.comment}
              onChange={this.changeComment}
              hintText="Comment" style={{ width: 100 }}
            />
          </div>
          <div>
            <Button
              raised
              style={{ margin: 12 }}
              onClick={this.updateBudget}
            >
              Edit
            </Button>
            <Button
              raised 
              style={{ margin: 12 }}
              onClick={this.deleteBudget}
            >
              Remove
            </Button>
          </div>
        </Popover>
      </div>
    );
  }
}

BudgetTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BudgetTable);
