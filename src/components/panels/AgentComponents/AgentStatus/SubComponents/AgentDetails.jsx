import * as React from 'react';
import './agentstyle.css';
// let defaultStyle = { 
//     color : '#fff' 
//   };
export default class AgentDetails extends React.Component {
    render () {
      let classname = this.props.user.phoneState === "ACDAVAIL" ? "agentactive" : "agentinactive";
      return(this.props.user ? 
        <div style={{display:"flex"}} className={classname}>
          <div style={{paddingRight:"10px"}}>
          <h3>{this.props.user.firstname}</h3></div>
          <div>
          <h3>{this.props.user.ext}</h3>
        </div>
        </div> :
        <h3>loading users</h3>
      ); 
    }
  }