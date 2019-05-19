import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import Chart from 'react-google-charts';


class ConsumptionCategoryPieChart extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Array),
    width: PropTypes.oneOf(['xs', 'sm',' md', 'lg', 'xl'])
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const { data, width, className } = this.props;

    const extraChartOptions = width === 'xs' ? {
      chartArea: { left: 10, top: 10, right: 10, bottom: 10, width: '100%' },
      legend:  {
        position: 'left',
        textStyle: { fontSize: 8 },
      },
    } : {
      chartArea: { left: 20, top: 20, right: 20, bottom: 20, width: '100%' },
    };

    return (
      <div className={className}>
        <h2 style={{ textAlign: 'center' }}>Consumptions on Categories Pie</h2>

        <Chart
          width={width === 'xs' ? 'calc(100vw - 16px)' : '50vw'}
          height={width === 'xs' ? 200 : 400}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Category', 'Money spent'],
            ...data.map(item => ([ `${item.name} (${item.sum})`, item.sum])),
          ]}
          options={{
            is3D: true,
            pieHole: 0.5,
            tooltip: {
              text: 'percentage'
            },
            ...extraChartOptions,
          }}
        />
      </div>
    );
  }
}

export default withWidth()(ConsumptionCategoryPieChart);
