import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CategoryAdd from '../components/CategoryAdd';
import CategoryTable from '../components/CategoryTable';

class Categories extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.getCategoriesList();
  }

  render() {
    const { categories, actions } = this.props;

    return (
      <div>
        <CategoryAdd
          createCategory={actions.createCategory}
        />
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
  categories: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    categories: state.categories.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
