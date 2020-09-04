import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';


class Chart extends Component{

    render(){
       
        return(
            <div className="chart">
                <Line
                    data={this.props.data}
                    options={{
                        responsive:true,
                        maintainAspectRatio:false,
                        title:{
                            display:true,
                            text:'COVID-19 Cases in United Kingdom',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                        scales: {
                            yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of cases',
                                fontSize:16
                            }
                            }],
                            xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Dates',
                                fontSize:16
                            },
                            type: 'time',
                                time: {
                                    unit: 'month'
                                },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                            }],
                        }  
                    }}
                />

            </div>
        )
    }
}


export default Chart;