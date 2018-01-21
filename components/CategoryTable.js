import React, { PropTypes, Component } from 'react';
import Table, { TableHeaderColumn, TableRow, TableHead, TableCell, TableBody } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const CategoryTable = React.createClass({

  getInitialState() {
    return {
      isToolbarOpen: false,
      toolbarAnchorEl: null,
      toolbarCategory: { id: null, name: null, date: null },
    };
  },

  handleToolbarOpen(event, rowIndex) {
    this.setState({
      isToolbarOpen: true,
      toolbarAnchorEl: event.target,
      toolbarCategory: this.props.categories[rowIndex],
    });
  },

  handleToolbarClose(event) {
    this.setState({
      isToolbarOpen: false,
      toolbarCategory: { id: null, name: null },
    });
  },

  deleteCategory() {
    this.props.deleteCategory(this.state.toolbarCategory.id);
    this.handleToolbarClose();
  },

  updateCategory(event) {
    this.props.updateCategory(this.state.toolbarCategory.id, this.state.toolbarCategory.name);
    this.handleToolbarClose();
  },

  changeName(event) {
    this.setState({ toolbarCategory: { id: this.state.toolbarCategory.id, name: event.target.value, date: this.state.toolbarCategory.date } });
  },

  render() {
    const { categories } = this.props;

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>
          Categories
        </h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip="ID">ID</TableCell>
              <TableCell tooltip="Name">Name</TableCell>
              <TableCell tooltip="Date">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows
          >
            {categories.map((item, index) =>
              <TableRow key={index}>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {item.id}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
                  {item.name}
                </TableCell>
                <TableCell onClick={(e) => this.handleToolbarOpen(e, index)}>
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
          <p style={{ fontSize: 11, textAlign: 'center' }}>Category: ID {this.state.toolbarCategory.id}</p>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <TextField inputStyle={{ textAlign: 'center' }} value={this.state.toolbarCategory.name} onChange={this.changeName} hintText="Name" style={{ width: 100 }} />
          </div>
          <div>
            <Button
              raised
              style={{ margin: 12 }}
              onClick={this.updateCategory}
            >
              Edit
            </Button>
            <Button
              raised 
              style={{ margin: 12 }}
              onClick={this.deleteCategory}
            >
              Remove
            </Button>
          </div>
        </Popover>
      </div>
    );
  },
});

export default CategoryTable;
