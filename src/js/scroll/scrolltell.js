import 'intersection-observer';
import scrollama from 'scrollama';

export const scrollTellying = (chart)  => {
    const $container = d3.select('#scroll');
    const $graphic  = d3.select('#scroll__graphic');
    const $chart  = d3.select('#xy-chart-container');
    const $text  = d3.select('.scroll__text');
    const $step = $text.selectAll('.step');

    const scroller = scrollama();

    const handleStepEnter=(response)  =>{
             response.element.classList.remove('inactive');
             response.element.classList.add('active');
            console.log(response)
         if(response.direction==='down'){
            switch(response.index) {
                case 0:
                  chart.addPoints();
                break;
                case 1:
                  chart.stage0();
                  break;
                case 2:
                  chart.stage1();
                  break;
                  }
                }else{
                 switch(response.index) {
                     case 0:
                       chart.stage0Remove();
                       break;
                     case 1:
                       chart.stage1Remove();
                       break;
                       }






                }


    }

  const handleStepExit = (response)  =>{
           console.log('exit')
           console.log(response);
           if(response.direction==='up'){
          switch(response.index) {
              case 0:
                chart.deletePoints();
                break;

                }
              }

  }





     scroller.setup({
       step: '.scroll__text .step',
       offset:.8,
       debug:true
      }).onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);




}
