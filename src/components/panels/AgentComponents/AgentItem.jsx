
import * as React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import AgentDetails from './SubComponents/AgentDetails';
import AgentStats from './SubComponents/AgentStats';
// let defaultStyle = { 
//     color : '#fff' 
//   };



export default class AgentItem extends React.Component {
    render () {
      return(
        
        <Grid columns = {2}>
           <AgentDetails ext={this.props.ext}/>
           <AgentStats ext={this.props.ext}/>
         </Grid>
    
      ); 
    }
  }