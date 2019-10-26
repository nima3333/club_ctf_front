import React, { Component } from 'react'
import Chart from "chart.js";
const moment = require('moment');

export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        var result = [{ x: "18:00", y: "230" }, { x: "19:00", y: "232" }, { x: "20:00", y: "236" }, { x: "22:00", y: "228" }];

        // parse labels and data
        var labels = result.map(e => moment(e.x, 'HH:mm'));
        var data = result.map(e => +e.y);


        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                   label: 'Points',
                   data: data,
                   borderWidth: 1,
                   lineTension: 0
                }]
             },
            options: {
                scales: {
                   xAxes: [{
                      type: 'time',
                      time: {
                         unit: 'hour',
                         displayFormats: {
                            hour: 'HH:mm'
                         }
                      }
                   }]
                },
             }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}