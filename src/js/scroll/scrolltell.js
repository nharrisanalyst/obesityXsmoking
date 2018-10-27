import 'intersection-observer';
import scrollama from 'scrollama';

export const scrollTellying = (chart)  => {

    const scroller = scrollama();

    const handleStepEnter=(response)  =>{

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
       debug:false
      }).onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);




}
