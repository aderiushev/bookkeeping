import React, { Component } from 'react';

import { Chart } from 'react-google-charts';

class MonthlyChart extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Daily Consumptions Chart
        </h2>
        {data && !!data.rows.length
          ?
            <Chart
              columns={data.columns}
              rows={data.rows}
              options={{
                  title: 'Your Consumptions',
                  hAxis: { title: 'Day' },
                  vAxis: { title: 'Sum' },
              }}
              chartType="LineChart"
              height={500}
              graph_id="monthlyChart"
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

export default MonthlyChart;
