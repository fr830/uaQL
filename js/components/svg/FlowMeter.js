// @flow

'use strict';

import React from 'react';
import {compose} from 'recompose';
import Value from './Value';


const FlowMeter = compose(

  

)(({value})=> 



  <g viewBox="0 0 100 65.277">
    <path d="M29.167,22.222c-9.722,0-19.444,4.755-29.167,7.614v11.111c9.722-2.858,19.444-7.614,29.167-7.614  c13.889,0,27.778,9.723,41.667,9.723c9.723,0,19.444-4.757,29.167-7.615V24.33c-9.723,2.858-19.444,7.615-29.167,7.615  C56.944,31.944,43.056,22.222,29.167,22.222z"></path>
    <path d="M29.167,44.444c-9.722,0-19.444,4.755-29.167,7.614V63.17c9.722-2.859,19.444-7.614,29.167-7.614  c13.889,0,27.778,9.722,41.667,9.722c9.723,0,19.444-4.757,29.167-7.614V46.552c-9.723,2.857-19.444,7.614-29.167,7.614  C56.944,54.166,43.056,44.444,29.167,44.444z"></path>
    <path d="M70.833,9.722C56.944,9.722,43.056,0,29.167,0C19.444,0,9.722,4.755,0,7.614v11.111c9.722-2.859,19.444-7.615,29.167-7.615  c13.889,0,27.778,9.722,41.667,9.722c9.723,0,19.444-4.756,29.167-7.614V2.108C90.277,4.965,80.556,9.722,70.833,9.722z"></path>
    <Value x={0} y={90} value={value}/>
   
  </g>
);


/*

<g viewBox="0 0 100 94.335">
  <g>
    <path d="M29.167,37.445c-9.722,0-19.444,4.755-29.167,7.614V56.17c9.722-2.858,19.444-7.614,29.167-7.614   c13.889,0,27.778,9.723,41.667,9.723c9.723,0,19.444-4.757,29.167-7.614V39.553c-9.723,2.857-19.444,7.614-29.167,7.614   C56.944,47.167,43.056,37.445,29.167,37.445z"></path>
    <path d="M29.167,59.667c-9.722,0-19.444,4.755-29.167,7.614v11.111c9.722-2.859,19.444-7.614,29.167-7.614   c13.889,0,27.778,9.722,41.667,9.722c9.723,0,19.444-4.757,29.167-7.614V61.775c-9.723,2.858-19.444,7.614-29.167,7.614   C56.944,69.389,43.056,59.667,29.167,59.667z"></path>
    <path d="M70.833,24.945c-13.889,0-27.777-9.722-41.667-9.722c-9.722,0-19.444,4.755-29.167,7.615v11.111   c9.722-2.859,19.444-7.614,29.167-7.614c13.889,0,27.778,9.722,41.667,9.722c9.723,0,19.444-4.757,29.167-7.615V17.331   C90.277,20.189,80.556,24.945,70.833,24.945z"></path>
  </g>
  <rect x="44.444" y="-3.825" transform="matrix(0.8716 0.4903 -0.4903 0.8716 29.5455 -18.4554)" width="11.111" height="101.985"></rect>
</g>

*/

export default FlowMeter;


