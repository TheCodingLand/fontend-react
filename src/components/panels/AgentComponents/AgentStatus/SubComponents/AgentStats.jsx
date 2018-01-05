
import * as React from 'react';
// let defaultStyle = { 
//     color : '#fff' 
//   };
export default class AgentStats extends React.Component {
    render () {
      console.log(this.props);
      return(this.props.user ?
      <div><h3>{this.props.user.phoneLogin}test</h3>
        <h3><p>{this.props.user.prenom}test</p></h3> </div> :
      <h3>loading Agent</h3>
      ); 
    }
  }