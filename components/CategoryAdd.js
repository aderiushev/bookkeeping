import React, { Component, PropTypes } from 'react'
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item'
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import TextField from 'material-ui/lib/text-field';
import $ from 'jquery';


class CategoryAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Новая категория'
        };
    }

    createCategory(event) {
        this.props.createCategory(this.state.name);
    }

    changeName(event) {
        this.setState({name:event.target.value})
    }

    render() {

        return (
            <div style={{textAlign:'center', padding:40}}>
                <TextField inputStyle={{textAlign:'center'}} defaultValue={this.state.name} onChange={this.changeName.bind(this)} style={{width:300}} hintText='Name' />
                <br />
                <FloatingActionButton style={{marginTop:20}} onClick={this.createCategory.bind(this)}>
                    <ContentAdd addConsumption />
                </FloatingActionButton>
            </div>
        )
    }
}

CategoryAdd.propTypes = {
    createCategory: PropTypes.func.isRequired
};


export default CategoryAdd