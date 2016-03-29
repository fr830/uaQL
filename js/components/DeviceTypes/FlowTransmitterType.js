// @flow

'use strict';

import React from 'react';
import Relay from 'react-relay';
import {createContainer} from 'recompose-relay';
import {compose, doOnReceiveProps} from 'recompose';
import {Observable} from 'rx';
import {observeProps} from 'rx-recompose';
import DataValue from '../DataValue';
import FlowMeter from '../svg/FlowMeter';
import socketObservable from '../../data/SocketObservable'


const FlowTransmitterType = compose(

  createContainer(
    {
      fragments: {
        viewer: () => Relay.QL`
          fragment on UANode {
            output: browsePath(paths: ["Output:4"], types:["ns=0;i=47"]) {
              displayName {
                text
              }
              nodeId {
                namespace,
                value
              }
              dataValue {
                ... on IUaDataValue {
                  ... on UaFloat {
                    value
                  }
                }
              }
              
              ${DataValue.getFragment('viewer')}
            }
          }
        `
      }
    }
  ),
  observeProps(props$=>{
      const viewer = props$.map(p=>p.viewer)
      return {
        viewer,
        value:viewer.map(v=>{
            if(v.output) {
              return socketObservable(`ns=${v.output.nodeId.namespace};i=${v.output.nodeId.value}`);
            } else {
              return Observable.return();
            }
          })
          .switch()
      };
    }
  )


)(({viewer, value})=>
  <div>  OHHHHHH{viewer.output 
    ? <div> FXXXXX-------- <svg><FlowMeter value={value ? value.value : undefined}/></svg>
        {viewer.output.displayName.text}
        <DataValue viewer={viewer.output}/>
      </div>
    : undefined}
  
  </div>
);


export default FlowTransmitterType;
