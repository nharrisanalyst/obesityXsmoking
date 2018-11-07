
var  d3Scale = require('d3-scale');

var d3Selection = require("d3-selection")
import legend from 'd3-svg-legend';
import 'd3-transition';

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
    this.legend = legend;
    console.log(this.data);
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.stage = -1;

    this.draw()
  }
  draw(){
    this.el.innerHTML = '';
    this.width = this.el.clientWidth

    this.height= this.width;
    this.margin = {
      t:25,
      r:55,
      l:55,
      b:25
    }
     const svg = d3Selection.select(this.el).append('svg');
        svg.attr('width',  this.width);
        svg.attr('height', this.height);

        // we'll actually be appending to a <g> element
        this.plot = svg.append('g')
                       .attr('class', 'chart-main')
            .attr('transform',`translate(${this.margin.l},${this.margin.t})`)

        const top = (window.innerHeight-this.height)/2

        d3.select('#flow_chart').attr('style',() => {
                      return 'top:'+Number(top)+'px;'});
        d3.selectAll('.step2').style('padding-bottom',window.innerHeight+'px');

      this.createScales();
      this.createAxis();
      this.addLines();
      this.addLegend();
      this.addLabels();

      if(this.stage>0){this.stage1()}

    }

    createScales(){
      const m = this.margin;

      this.yScale = d3Scale.scaleLinear()
                           .domain([.5,0]).nice()
                           .range([m.b,this.height-(m.t+m.b)]);

      this.xStart = 0;
      this.xEnd = this.width-(m.r+m.l);

    }

    createAxis(){
      this.yScaleL = d3.axisLeft(this.yScale).ticks(4);
      this.yScaleR = d3.axisRight(this.yScale).ticks(4);
      this.plot.append('g')
                .attr('class', 'y-scale-L')
                .call(this.yScaleL);
      this.plot.append('g')
                .attr('class', 'y-scale-R')
                .attr('transform', 'translate(' + this.xEnd + ',' +0 + ')')
                .call(this.yScaleR);
    }

    addLines(){
      console.log(d3.schemeCategory10)
      console.log('addlines');

          console.log(this.data);
            this.plot.append('g')
                      .attr('class', 'lines')
                      .selectAll('line')
                      .data(this.data)
                      .enter()
                      .append('line')
                      .attr('stroke',(d,i) =>{
                         switch(d.smoker_int_ob){
                           case '0':
                             return d3.schemeCategory10[2];
                          case '1':
                            return d3.schemeCategory10[0];
                          case '2':
                            return d3.schemeCategory10[1];
                          case '3':
                            return d3.schemeCategory10[3];


                         }
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

    addLegend(){
      this.colors = d3.scaleOrdinal(d3.schemeCategory10);
      console.log(d3.schemeCategory10)
      console.log(this.colors(1))

        const ordinalScale =  d3.scaleOrdinal().domain(["Obese & Smoker", "Obese Only", "Smoker Only", "Non Smoker Non Obese"])
                                               .range([d3.schemeCategory10[3],d3.schemeCategory10[1],d3.schemeCategory10[0], d3.schemeCategory10[2]])

        const legend = this.plot.append('g')
                                .attr('class', 'legend-scale')
                                .attr('transform', 'translate(' + (this.width-325) + ',' + 20 + ')')

        const legendCategorical = this.legend.legendColor()
                                   .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
                                   .shapePadding(10)
                                   .scale(ordinalScale);


              legend.call(legendCategorical);


    }
    addLabels(){
          this.plot.append('g')
                    .attr('class', 'label-percent')
                    .attr('transform', 'rotate(270) translate(' + -(this.height/2) + ',' + -40 + ') ')
                    .append('text')
                    .text('% of total count')


          this.plot.append('g')
                    .attr('class', 'label-sum-cost')
                    .attr('transform', 'rotate(270) translate(' + -(this.height/2) + ',' + (this.width-(this.margin.l))+ ') ')
                    .append('text')
                    .text('% of total sum of cost')

    }
    stage1Remove(){
      this.stage= -1;
      this.plot.select('.annote-circle').remove();
    }


    stage1(){
      this.stage = this.stage<1?1:this.stage;
       const dataSmoker = this.data[3];

      const dataStage1 = []
            dataStage1.push(dataSmoker.count_perc)
            dataStage1.push(dataSmoker.cost_perc)

        this.plot.append('g')
                  .attr('class', 'annote-circle')
                  .selectAll('circle')
                  .data(dataStage1)
                  .enter()
                  .append('circle')

                  .attr('r', 20)
                  .attr('cy', d =>{
                    return this.yScale(Number(d));
                  })
                  .attr('cx', (d,i) => {
                    if(i===0){return 0}
                    return this.xEnd
                  })
                  .attr('stroke', 'none')
                  .attr('fill', 'none')

        this.plot.select('.annote-circle')
                  .selectAll('circle')
                  .attr('stroke', 'black')


    }


}
