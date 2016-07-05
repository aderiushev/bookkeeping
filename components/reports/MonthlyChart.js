import React, { Component, PropTypes } from 'react'

import $ from 'jquery';

var Chart = require('react-google-charts').Chart;

const MonthlyChart = React.createClass({

    getInitialState: function() {
        let columns = [];
        let rows = [];
        $.ajax({
            url: '/monthly-chart',
            type: 'GET',
            async: false,
            success: function(data) {
                columns = data.columns;
                rows = data.rows;
            }
        });

        return {
            chart:{
                columns : [{label:'Date', type:'string'}].concat(columns),
                rows: rows,
                height: 500,
                options: {curveType: 'function', title: "Your Consumptions", hAxis: {title: 'Day'}, vAxis: {title: 'Sum'}},
                chartType: "LineChart",
                div_id: "chart"
            }
        };
    },

    render() {
        return (
            <Chart chartType={this.state.chart.chartType}
                   rows={this.state.chart.rows}
                   columns={this.state.chart.columns}
                   options={this.state.chart.options}
                   height={this.state.chart.height}
                   graph_id={this.state.chart.div_id}  />
        )
    }
});

export default MonthlyChart