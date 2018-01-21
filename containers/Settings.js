import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import BudgetManage from '../components/BudgetManage';

class Settings extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.initBudget();
  }

  render() {
    const { budget, actions } = this.props;

    return (
      <div>
        <BudgetManage
          budget={budget}
          setBudget={actions.setBudget}
          updateMoneyLeft={actions.updateMoneyLeft}
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
    budget: state.budget,
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
