import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link, browserHistory } from 'react-router'
import ShoppingCartItemAddIcon from 'material-ui/lib/svg-icons/action/add-shopping-cart';
import ListItemIcon from 'material-ui/lib/svg-icons/action/list';
import DeveloperBoardIcon from 'material-ui/lib/svg-icons/hardware/developer-board';
import BuildIcon from 'material-ui/lib/svg-icons/action/build';
import IconButton from 'material-ui/lib/icon-button';
import MoneyLeft from '../components/MoneyLeft';


class Header extends Component {

    render() {
        return (
            <AppBar iconElementLeft={<MoneyLeft />}
                    title={"Bookkeeping Service"} titleStyle={{paddingLeft:30}}>
                <RaisedButton icon={<ShoppingCartItemAddIcon />} onClick={() => browserHistory.push('/')} label="Consumptions" style={{margin:15}} />
                <RaisedButton icon={<ListItemIcon />} onClick={() => browserHistory.push('/categories-page')} label="Categories" style={{margin:15}} />
                <RaisedButton icon={<DeveloperBoardIcon />} onClick={() => browserHistory.push('/reports-page')} label="Reports" style={{margin:15}} />
                <RaisedButton icon={<BuildIcon />} onClick={() => browserHistory.push('/settings-page')} label="Settings" style={{margin:15}} />
            </AppBar>
        )
    }
}

export default Header