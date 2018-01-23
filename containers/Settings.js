import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import BudgetManage from '../components/BudgetManage';
import BudgetTable from '../components/BudgetTable';

class Settings extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.getBudgetsList();
  }

  render() {
    const { budgets, actions } = this.props;

    return (
      <div>
        <BudgetManage
          createBudget={actions.createBudget}
          updateMoneyLeft={actions.updateMoneyLeft}
        />
        <BudgetTable
          budgets={budgets}
          deleteBudget={actions.deleteBudget}
          updateBudget={actions.updateBudget}
          />
      </div>
    );
  }
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    budgets: state.budget.list,
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
)(Settings);
