import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CircularProgress from 'material-ui/lib/circular-progress';

import BudgetManage from '../components/BudgetManage';

import $ from 'jquery';


class Settings extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(actions.initBudget());
    }

    render() {
        const { budget, actions } = this.props;

        return (
            <div>
                <BudgetManage budget={budget} setBudget={actions.setBudget} updateMoneyLeft={actions.updateMoneyLeft}/>
            </div>
        )

    }
}

Settings.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        budget: state.budget
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        dispatch: dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)