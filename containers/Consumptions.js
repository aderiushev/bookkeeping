import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions';
import { getGiphy } from '../actions'
import ConsumptionAdd from '../components/ConsumptionAdd';
import ConsumptionTable from '../components/ConsumptionTable';

const styles = {

};

class Consumptions extends React.Component {

  componentDidMount() {
    const { actions } = this.props;

    actions.getCategoriesList();
    actions.getConsumptionsList();
  }

  render() {
    const {
      actions, consumptions, categories, classes
    } = this.props;

    return (
      <div className={classes.root}>
        <ConsumptionAdd
          createConsumption={actions.createConsumption}
          updateMoneyLeft={actions.updateMoneyLeft}
          getGiphy={getGiphy}
          categories={categories}
        />

        <ConsumptionTable
          className={classes.table}
          consumptions={consumptions}
          updateMoneyLeft={actions.updateMoneyLeft}
          deleteConsumption={actions.deleteConsumption}
          updateConsumption={actions.updateConsumption}
        />
      </div>
    );
  };
}

Consumptions.propTypes = {
  consumptions: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.shape().isRequired,
};


const mapStateToProps = state => ({
  consumptions: state.consumptions.list,
  categories: state.categories.list,
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
