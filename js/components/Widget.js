// @flow

'use strict';

import React from 'react';
import Relay from 'react-relay';
import LocalizedText from './LocalizedText';
import {createContainer} from 'recompose-relay';
import {compose} from 'recompose';
import Pipe from './Pipe';







const Widget = compose(

  createContainer(
    {
      fragments: {
        root: ()=> Relay.QL`
          fragment on UANode {
            serverNamespaces: browsePath(paths:["Objects", "Server", "NamespaceArray"]) {
              dataValue { 
                ... on UaStringArray {value}
              }
            } 
          }
        `,
        widgetviewer: () => Relay.QL`
          fragment on UANode {
            displayName {
              text
            }
            pipe001: browsePath(paths:["PipeX001:4"]) {
              id
              ${Pipe.getFragment('viewer')}
             
            }
          }
        `
      }
    }
  )

)(({widgetviewer, root})=>
  <div>
    <h1>
      {widgetviewer.pipe001 ? widgetviewer.pipe001.id : 'nah'}
      {widgetviewer.displayName.text}
    }
    </h1>
    {widgetviewer.pipe001 
      ? <Pipe viewer={widgetviewer.pipe001}/>
      : null 
    }
    
  
    <svg>
      <path fill="#999999" d="M50.007,0c-19.92,0-36.068,3.364-36.068,7.514v54.102c0,0.647,0.393,1.276,1.132,1.875l0.644,0.53V100
        h7.889V70.521l20.571,16.948c0.655,0.544,3.017,0.947,5.831,0.947c2.695,0,4.975-0.369,5.739-0.878l18.952-15.61V100h7.889V65.43
        l2.326-1.916c0.758-0.606,1.161-1.243,1.161-1.899V7.514C86.074,3.364,69.926,0,50.007,0z">
      </path>

      <g id="dark">
        <path fill="#666666" d="M50.007,69.13c-10.427,0-19.817-0.922-26.403-2.396v3.787l20.571,16.948
          c0.655,0.544,3.017,0.947,5.831,0.947c2.695,0,4.975-0.369,5.739-0.878l18.952-15.61v-4.837
          C68.244,68.355,59.561,69.13,50.007,69.13z">
        </path>
        <rect x="21.35" y="52.663" fill="#666666" width="2.254" height="47.337"></rect> 
        <rect x="80.333" y="52.663" fill="#666666" width="2.254" height="47.337"></rect> 
      </g>
      <g id="light">
        <ellipse fill="#cccccc" cx="50.007" cy="7.514" rx="36.068" ry="7.514"></ellipse>
        <polygon fill="#cccccc" points="75.636,53.671 75.636,100 74.697,100 74.697,52.663 80.333,52.663 80.333,53.671     "></polygon>
      </g>
      <g id="shadow">
        <polygon fill="#666666" points="53.25,87.914 55.315,87.914 75.033,71.359 75.033,67.109    "></polygon>
        <path fill="#666666" d="M83.587,10.255v54.351l1.326-1.092c0.758-0.607,1.161-1.243,1.161-1.899V7.514
        C86.074,8.482,85.187,9.406,83.587,10.255z"></path> 
      </g>
      <g id="hlight">
        <ellipse fill="#cccccc" cx="28.436" cy="5.072" rx="9.919" ry="2.066"></ellipse>
        <polygon fill="#cccccc" points="16.653,53.671 16.653,100 15.715,100 15.715,52.663 21.35,52.663 21.35,53.671     "></polygon>
      </g>      
    </svg>
  </div>
);


export default Widget;
