import React, { PropTypes, Component } from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TextField from 'material-ui/lib/text-field';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';

const CategoryTable = React.createClass({

    getInitialState() {
        return {
            isToolbarOpen: false,
            toolbarAnchorEl: null,
            toolbarCategory: {id: null, name: null, date: null}
        };
    },

    handleToolbarOpen(rowIndex, cellIndex, event) {
        this.setState({
            isToolbarOpen: true,
            toolbarAnchorEl: event.target,
            toolbarCategory: this.props.categories[rowIndex]
        });
    },

    handleToolbarClose(event) {
        this.setState({
            isToolbarOpen: false,
            toolbarCategory: {id: null, name: null}
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
        this.setState({toolbarCategory: {id: this.state.toolbarCategory.id, name: event.target.value, date: this.state.toolbarCategory.date}});
    },

    render() {
        const { categories } = this.props;

        return (
            <div>
                <h3 style={{textAlign:'center'}}>
                    Categories
                </h3>
                <Table
                    onCellClick={this.handleToolbarOpen}
                    selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow >
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Date">Date</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        stripedRows={true}>
                        {categories.map((item, index) => (
                            <TableRow key={index} selected={false}>
                                <TableRowColumn>{item.id}</TableRowColumn>
                                <TableRowColumn>{item.name}</TableRowColumn>
                                <TableRowColumn>{item.date}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Popover
                    useLayerForClickAway={false}
                    onRequestClose={this.handleToolbarClose}
                    open={this.state.isToolbarOpen}
                    anchorEl={this.state.toolbarAnchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                    <p style={{fontSize:11, textAlign:'center'}}>Category: ID {this.state.toolbarCategory.id}</p>
                    <Divider />
                    <div style={{textAlign: 'center'}}>
                        <TextField inputStyle={{textAlign:'center'}} value={this.state.toolbarCategory.name} onChange={this.changeName} hintText='Name' style={{width:100}}/>
                    </div>
                    <div>
                        <RaisedButton label="Edit" secondary={true} style={{margin:12}} onClick={this.updateCategory} />
                        <RaisedButton label="Delete" primary={true} style={{margin:12}} onClick={this.deleteCategory}/>
                    </div>
                </Popover>
            </div>
        )
    }
});

export default CategoryTable;