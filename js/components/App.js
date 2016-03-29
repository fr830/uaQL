// @flow

'use strict';


import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import Comp from './comp';
import ReferenceLink from './ReferenceLink';
import NodeName from './NodeName';
import Widget from './Widget';
import NodeId from './NodeId';
import Links from './Links';
import LocalizedText from './LocalizedText';
import DataValue from './DataValue';
import DataType from './DataType';
import {compose} from 'recompose';
import {createContainer} from 'recompose-relay';
import Simple from './Simple'; 


var value = 0;


class UaNodeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {updateUANode}`;
  }
  getVariables() {
    return {
      id: this.props.viewer.id,
      value: value,
      dataType: this.props.viewer.dataValue.value.dataType
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateUANodePayload {
        uaNode
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        uaNode: this.props.viewer.id
      }
    }];
  }
  static fragments = {
    viewer: () => Relay.QL`
      fragment on UANode {
        dataValue{
          value{
            dataType
          }
        }
      }
    `
  };
}

class CallUAMethodMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {callUAMethod}`;
  }
  getVariables() {
    return {
      id: this.props.viewer.id,
      parent: this.props.viewer.parent.edges[0].node.uaNode.id
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CallUAMethodPayload {
        uaNode {outputArguments}
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        uaNode: this.props.viewer.id
      }
    }];
  }
  
 /* static fragments = {
    viewer: () => Relay.QL`
      fragment on UANode {
        id
      }
    `
  };
*/
}


var onFailure = (transaction) => {
  var error = transaction.getError() || new Error('Mutation failed.');
  alert(error);
};



class App extends React.Component {
  
   _handleCount(){
    // To perform a mutation, pass an instance of one to `Relay.Store.commitUpdate`
    Relay.Store.commitUpdate(new UaNodeMutation({viewer: this.props.viewer}), {onFailure});
    value++;
  }
  _handleMethod(){
    // To perform a mutation, pass an instance of one to `Relay.Store.commitUpdate`
    Relay.Store.commitUpdate(new CallUAMethodMutation({viewer: this.props.viewer}), {onFailure});
  }
  componentWillMount() {
    
    this.props.relay.setVariables({
      'nodeClassIsVariable': this.props.viewer.nodeClass ==='Variable'
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.viewer.nodeClass !== nextProps.viewer.nodeClass) {
      this.props.relay.setVariables({
        'nodeClassIsVariable': nextProps.viewer.nodeClass ==='Variable'
      });
    }
    
  }
  render() {
    return (
      <div>
        <Simple/>
        {this.props.root.browsePath.dataValue.value.map(v=>
          <li key={v}>
            {v}
          </li>
        )}
        <Comp viewer={this.props.viewer}/>
        <h1>
          <NodeName viewer={this.props.viewer}/>
        </h1>
        <button onClick={this._handleCount}>Like this</button>
        <button onClick={this._handleMethod}>Method Call</button>
        
        <DataType viewer={this.props.viewer}/>
        <DataValue viewer={this.props.viewer}/>
        <h3 title='nodeId'>
          <NodeId viewer={this.props.viewer.nodeId}/>
        </h3>
        <h4 title='nodeClass'>
          {this.props.viewer.nodeClass}
        </h4>
        <LocalizedText viewer={this.props.viewer.description}/>

        <ul>
          {this.props.viewer.forwardReferences.edges.map(r=>
            <li key={r.node.id}>
              <ReferenceLink viewer={r.node}/>  
            </li>
          )}
        </ul>
        <ul>
          {(this.props.viewer.outputArguments || []).map(arg=>
            <li key={arg.index}>{arg.dataType} {arg.value.value}</li>
          )}
        </ul>
        <Links {...this.props} path={this.props.params.nodeId}/>
        {this.props.children}
              
      </div>
    );
  }
}
App.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object.isRequired
};
const Appp = compose(
  createContainer( {
    initialVariables: {
      'nodeClassIsVariable': undefined
    },
    prepareVariables: (prevVariables,...args) => {
      return {
        ...prevVariables
        // If devicePixelRatio is `2`, the new size will be `100`.
      };
    },
    fragments: {
      root: () => Relay.QL`
        fragment on UANode {
          ${Links.getFragment('root')}
          
          browsePath(paths:["Objects", "Server", "NamespaceArray"]) {
            dataValue { 
              ... on UaStringArray {value}
            }
          } 
        }
      `,
      viewer: () => Relay.QL`
        fragment on UANode {
          id
          nodeClass
          ${Links.getFragment('viewer')}
          ${Comp.getFragment('viewer')}
          ${NodeName.getFragment('viewer')}
          description {
            ${LocalizedText.getFragment('viewer')}
          }
          ${DataValue.getFragment('viewer')}
          ${DataType.getFragment('viewer')}
          nodeId {
            ${NodeId.getFragment('viewer')}
          }
          forwardReferences: references(first:100 browseDirection: Forward) {
            edges {
              node {
                ${ReferenceLink.getFragment('viewer')}
                id
              }
            }
          },
          outputArguments {
            index
            dataType
            arrayType
            value {
              ... on BooleanArgumentValue {value}  
              ... on IntArgumentValue {value}  
              ... on Int64ArgumentValue {value}  
              ... on FloatArgumentValue {value}  
              ... on StringArgumentValue {value}  
            }  
          }
        }
      `
    }
  })
)(App);

export default Appp;