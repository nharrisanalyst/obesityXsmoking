
var  d3Scale = require('d3-scale');
var  d3ScaleChromatic = require("d3-scale-chromatic");
var d3Selection = require("d3-selection")

var names =[
  [["non Smoker not Obese"],["Percent of Sample"]],
  [["Smoker not Obese"],["Percent of Sample"]],
  [["non Smoker Obese"],["Percent of Sample"]],
  [["Smoker and Obese"],["Percent of Sample"]],
]


export class Chart {
  constructor(config){
    this.el = config.conEl;
    this.data = config.data;

    this.draw()
  }
  draw(){
    this.el.innerHTML = '';
    this.width = this.el.clientWidth

    this.height= this.width;
    this.margin = {
      t:25,
      r:25,
      l:25,
      b:25
    }
     const svg = d3Selection.select(this.el).append('svg');
        svg.attr('width',  this.width);
        svg.attr('height', this.height);

        // we'll actually be appending to a <g> element
        this.plot = svg.append('g')
            .attr('transform',`translate(${this.margin.left},${this.margin.top})`)

      this.createScales();
      this.createAxis();
      this.addLines();
    }

    createScales(){
      const m = this.margin;

      this.yScale = d3Scale.scaleLinear()
                           .domain([.5,0])
                           .range([m.b,this.height-(m.t+m.b)]);

      this.xStart = m.l;
      this.xEnd = this.width-m.r;

    }

    createAxis(){
      this.yScaleL = d3.axisLeft(this.yScale).ticks(2);
      this.yScaleR = d3.axisRight(this.yScale).ticks(2);
      this.plot.call(this.yScaleL);
      this.plot.call(this.yScaleR);
    }

    addLines(){
          console.log(this.data);
            this.plot.selectAll('line')
                .data(this.data)
                .enter()
                .append('line')
                .attr('stroke',(d,i) =>{
                   return d3ScaleChromatic.schemeCategory10[i];
                })
                .attr('x1', (d,i)=>{
                  return this.xStart;
                })
                .attr('y1', (d,i)=>{
                  return this.yScale(d.count_perc);
                })
                .attr('x2', this.xEnd)
                .attr('y2', (d,i) =>{
                  return this.yScale(d.cost_perc)
                })
    }


}
