/* global d3 */

import insurance from '../assets/data/insurance.json';

import {Chart} from './pudding-chart/Chart.js';

import data from '../assets/data/count_obesity_cost.json';
import {XYChart} from './pudding-chart/XYChart.js';
import {scrollTellying} from './scroll/scrolltell.js';
import {scrollTellyingChart} from './scroll/scrolltwo.js';

var xyChart;
var chart;

function resize() {
   xyChart.draw()
   chart.draw()
}


function init() {


 xyChart = new XYChart({
   data:insurance,
   conEl:document.querySelector('#xy-chart-container')

  })

scrollTellying(xyChart);

  chart = new Chart({
    data:data,
    conEl:document.querySelector('#flow_chart')
  })

scrollTellyingChart(chart);


 // const chart = new Chart({
	//  data:data,
	//  el:document.querySelector('#slope-line-container')
 // })
}




export default { init, resize };
