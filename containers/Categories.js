import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CategoryAdd from '../components/CategoryAdd';
import CategoryTable from '../components/CategoryTable';

import $ from 'jquery';


class Categories extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.initCategories());
  }

  render() {
    const { categories, actions } = this.props;
    return (
      <div>
        <CategoryAdd createCategory={actions.createCategory} />
        <CategoryTable
          categories={categories}
          deleteCategory={actions.deleteCategory}
          updateCategory={actions.updateCategory}
        />
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
