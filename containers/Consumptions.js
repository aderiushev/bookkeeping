import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import * as actions from '../actions';
import ConsumptionAdd from '../components/ConsumptionAdd';
import ConsumptionTable from '../components/ConsumptionTable';

const styles = theme => ({
  root: {

  },
  table: {
    
  },
});

const Consumptions = React.createClass({

  componentDidMount() {
    const { actions } = this.props;

    actions.getCurrentBudget()
    actions.initCategories()
    actions.getConsumptionsList()
  },

  render() {
    const {
      actions, consumptions, categories, budget, classes
    } = this.props;

    return (
      <div className={classes.root}>
        <ConsumptionAdd
          createConsumption={actions.createConsumption}
          updateMoneyLeft={actions.updateMoneyLeft}
          categories={categories}
          budget={budget}
        />
        <ConsumptionTable
          className={classes.table}
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
  consumptions: state.consumptions.list,
  categories: state.categories,
  budget: state.budget.current,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Consumptions));
