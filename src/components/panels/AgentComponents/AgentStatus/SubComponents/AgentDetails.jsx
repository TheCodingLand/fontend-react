import * as React from 'react';

// let defaultStyle = { 
//     color : '#fff' 
//   };
export default class AgentDetails extends React.Component {
    render () {
      return(this.props.user ? 
        <div style={{display : 'inline-block'}}>
          <h3> AgentDetails : {this.props.user.nom}</h3>
          <h3> AgentPhone : {this.props.user.ext}</h3>
        </div> :
        <h3>loading users</h3>
      ); 
    }
  }