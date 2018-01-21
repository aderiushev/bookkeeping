import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ConsumptionAdd from '../components/ConsumptionAdd';
import ConsumptionTable from '../components/ConsumptionTable';


const Consumptions = React.createClass({

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(actions.initBudget());
    dispatch(actions.initCategories());
    dispatch(actions.initConsumptions());
  },

  render() {
    const {
      actions, consumptions, categories, budget,
    } = this.props;

    return (
      <div>
        <ConsumptionAdd
          createConsumption={actions.createConsumption}
          updateMoneyLeft={actions.updateMoneyLeft}
          categories={categories}
          budget={budget}
        />
        <ConsumptionTable
          consumptions={consumptions}
          budget={budget}
          updateMoneyLeft={actions.updateMoneyLeft}
          deleteConsumption={actions.deleteConsumption}
          updateConsumption={actions.updateConsumption}
        />
      </div>
    );
  },
});

Consumptions.propTypes = {
  consumptions: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  consumptions: state.consumptions,
  categories: state.categories,
  budget: state.budget,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Consumptions);
