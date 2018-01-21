import React, { Component, PropTypes } from 'react';

//const Chart = require('react-google-charts').Chart;
import { Chart } from 'react-google-charts'

class BudgetChart extends Component {
  render() {
    const { data } = this.props;

    console.warn('data', data)

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Budget Chart
        </h2>
        {data && !!data.rows.length
          ?
            <Chart
              columns={data.columns}
              rows={data.rows}
              options={{
              
                  title: 'Your budget changes',
                  hAxis: { title: 'Day' },
                  vAxis: { title: 'Budget' },
              }}
              chartType="LineChart"
              height={500}
              graph_id="budgetChart"
            />
          :
            <div>
              <h2 style={{ textAlign: 'center' }}>No data</h2>
            </div>
        }
      </div>
    )
  }
}

export default BudgetChart;
