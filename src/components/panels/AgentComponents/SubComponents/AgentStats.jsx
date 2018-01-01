
import * as React from 'react';
// let defaultStyle = { 
//     color : '#fff' 
//   };
export default class AgentStats extends React.Component {
    render () {
      return(
        <div style={{display : 'inline-block'}}>
        <h3>75</h3><h3>{this.props.ext}</h3>
        </div>
      ); 
    }
  }