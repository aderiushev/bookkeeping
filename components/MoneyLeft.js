import React, { Component, PropTypes } from 'react'
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    blue500, red500
} from 'material-ui/lib/styles/colors';
import * as actions from '../actions';


const MoneyLeft = React.createClass({

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.updateMoneyLeft());
    },

    render() {
        const { moneyLeft } = this.props;

        return (
            <div>
                <Badge
                    badgeStyle={{width:50, height: 50, backgroundColor:blue500, color:'white', left: 10}}
                    badgeContent={parseInt(moneyLeft) + ' P'}>
                </Badge>&#8381;
            </div>
        )
    }
});

MoneyLeft.propTypes = {
    moneyLeft: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        moneyLeft: state.moneyLeft
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
)(MoneyLeft)