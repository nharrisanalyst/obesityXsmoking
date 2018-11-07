import 'intersection-observer';
import scrollama from 'scrollama';


export const scrollTellyingChart = (chart) =>{


const handleStepEnter=(response)  =>{
        response.element.classList.remove('inactive');
        response.element.classList.add('active');
       console.log(response)

     if(response.direction==='down'){
        switch(response.index) {
            case 0:
              chart.stage1();
            break;
            case 1:

              break;
            case 2:

              break;
              }
            }else{
             switch(response.index) {
                 case 0:

                   break;
                 case 1:

                   break;
                   }






            }


}







const handleStepExit = (response)  =>{
         response.element.classList.remove('active');
         response.element.classList.add('inactive');
         if(response.direction==='up'){
        switch(response.index) {
            case 0:
              chart.stage1Remove();
              break;

              }
            }

}

const scroller = scrollama();


scroller.setup({
  step:'.step2',
  offset:.66,
 }).onStepEnter(handleStepEnter)
   .onStepExit(handleStepExit);




}
