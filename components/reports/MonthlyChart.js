import React, { Component, PropTypes } from 'react'
var Chart = require('react-google-charts').Chart;


class MonthlyChart extends Component {

    render() {
        const { data } = this.props;

        return data ?
            <div>
                <h2 style={{textAlign:'center'}}>Daily Consumptions Chart</h2>
                <Chart
                    columns={data.columns}
                    rows={data.rows}
                    options={{
                        curveType: 'function',
                        title: 'Your Consumptions',
                        hAxis: {title: 'Day'},
                        vAxis: {title: 'Sum'}
                    }}
                    chartType={'LineChart'}
                    height={500}
                    graph_id={'chart'}
                />
            </div>
        :
            <div>
                <h2 style={{textAlign:'center'}}>No data</h2>
            </div>
    }
}

export default MonthlyChart