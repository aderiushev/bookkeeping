import React, { Component, PropTypes } from 'react'
import $ from 'jquery';
var Chart = require('react-google-charts').Chart;
import * as actions from '../../actions';


class MonthlyChart extends Component {

    componentDidMount() {
        actions.getMonthlyChart();
    };

    render() {
        return true ?
            <div>
                <h2 style={{textAlign:'center'}}>Daily Consumptions Chart</h2>
                <Chart chartType={this.state.chart.chartType}
                    rows={this.state.chart.rows}
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
            </div> :
            <div>
                <h2 style={{textAlign:'center'}}>No data</h2>
            </div>
    }
}

export default MonthlyChart