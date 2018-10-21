import legend from 'd3-svg-legend';











export class XYChart{
  constructor(opts){
    this.data=opts.data;
    this.conEl = opts.conEl;
    this.stage = -1;
    this.legend = legend;
    this.draw();

  }
  draw(){
    console.log();
    console.log(this.stage)

    this.margin = {
            top: 20,
            right: 75,
            bottom: 45,
            left: 50
        };

    this.conEl.innerHTML='';
    this.width = this.conEl.offsetWidth-this.margin.right;
    this.height = this.width/2;
    d3.select('#scroll-chart').style('height',this.height+'px');
    const top = (window.innerHeight-this.height)/2

    d3.select('#xy-chart-container').attr('style',() => {
                  return 'top:'+Number(top)+'px;'});
    d3.selectAll('.step').style('padding-bottom',this.height+'px');


      //creat svg element

      const tag = '#'+this.conEl.id


      const svg = d3.select('#'+this.conEl.id).append('svg')
                     .attr('width',this.width+this.margin.right)
                     .attr('height', this.height);


    //this is the actual plot

        this.plot = svg.append('g')
                        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
        this.createScales();
        this.createAxis();


        if(this.stage>-1){this.addPoints()}

        if(this.stage>0){this.stage0()}
        
        if(this.stage>1){this.stage1()}


  }
  createScales(){

    //get max
    const extentX = d3.extent(this.data, d => Number(d.age));
    const maxY = d3.max (this.data, d => Number(d.charges));

    this.xScale = d3.scaleLinear()
                     .domain(extentX).nice()
                     .range([0, (this.width - this.margin.right)])


    this.yScale = d3.scaleLinear()
                    .domain([0, maxY]).nice()
                    .range([ (this.height-(this.margin.top+this.margin.bottom)),0])

  }

  createAxis(){
       //creating and binding d3.axis()

      const xAxis = d3.axisBottom(this.xScale);


      const yAxis = d3.axisLeft(this.yScale);


      this.plot.append('g')
               .attr('class','x-axis-g')
               .attr('transform', 'translate(' + 0 + ',' + (this.height-(this.margin.top+this.margin.bottom)) + ')')
               .call(xAxis);

      this.plot.append('g')
               .attr('class','y-axis-g')
               .call(yAxis);


  }

  addPoints(){
    this.stage = this.stage<0?0:this.stage;

       const points = this.plot.append('g')
                                .attr('class','xy-points')

              points.selectAll('circle').data(this.data).enter()
                                        .append('circle')
                                        .attr('cx', d => this.xScale(d.age))
                                        .attr('cy', d => this.yScale(d.charges))
                                        .attr('fill','grey')
                                        .transition()

                                        .attr('r', 3);




  }
  deletePoints(){
    this.stage=-1;
    this.plot.select('.xy-points').remove();
  }

  stageInit(){

  }
  stage0(){
    this.stage = this.stage<1?1:this.stage;
       const line = this.plot.append('g')
                               .attr('class', 'line-container');
             line.selectAll('line').data([0,1]).enter()
                                            .append('line')
                                            .transition()

                                             .attr('stroke','#3ff939')

                                             .attr('x1',0 )
                                             .attr('y1',(d,i) => i===0? this.yScale(7500):this.yScale(28000)  )
                                             .attr('x2',(this.width-this.margin.right))
                                             .attr('y2',(d,i) => i===0? this.yScale(21000):this.yScale(40000) )

  }
  stage0Remove(){
    this.stage=0;
      this.plot.select('.line-container').remove();
  }

  stage1(){
      this.stage = this.stage<2?2:this.stage;
      this.colors = d3.scaleOrdinal(d3.schemeCategory10);

      this.plot.select('.xy-points').selectAll('circle')
                                    .transition()

                                    .attr('fill', d =>{
                                      if(d.smoker === 'yes' && d.obese ==='1'){
                                        return this.colors(3);
                                      }
                                        if(d.smoker === 'yes'){
                                          return this.colors(1);
                                        }
                                        if(d.obese ==='1'){
                                          return this.colors(2);
                                        }
                                        return this.colors(0)
                                    })

      this.stage1Legend();




  }
  stage1Remove(){
    this.stage=1;
    this.plot.select('.categorical-scale').remove();
    this.plot.select('.xy-points').selectAll('circle')
                             .transition()
                             .attr('fill','grey')


  }

  stage1Legend(){
    //set scale for legend
      const ordinalScale =  d3.scaleOrdinal().domain(["Obese & Smoker", "Obese Only", "Smoker Only", "Non Smoker Non Obese"])
                                             .range([this.colors(3),this.colors(2),this.colors(1), this.colors(0)])

      const legend = this.plot.append('g')
                              .attr('class', 'categorical-scale')
                              .attr('transform', 'translate(' + 20 + ',' + 20 + ')')

      const legendCategorical = this.legend.legendColor()
                                 .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
                                 .shapePadding(10)
                                 .scale(ordinalScale);


            legend.call(legendCategorical);

  }


}
