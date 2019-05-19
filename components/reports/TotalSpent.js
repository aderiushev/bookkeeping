import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  value: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  currencySign: {
    fontSize: 22,
    fontWeight: 400,
    marginLeft: 4
  }
});

class TotalSpent extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Array),
    width: PropTypes.oneOf(['xs', 'sm',' md', 'lg', 'xl'])
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const { data, width, classes, className } = this.props;

    return (
      <div className={className}>
        <h2 style={{ textAlign: 'center' }}>Total Spent</h2>

        <div className={classes.value}>
          {Math.round(data)}
          <span className={classes.currencySign}>₽</span>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TotalSpent);
