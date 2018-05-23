
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
//import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import CardHeader from '@material-ui/core/CardHeader';
import TicketDrawer from './EditTicket/TicketDrawer';


let activestep= 2
  
@observer
export default class IncomingPanel extends React.Component {
   

    render () {
  
        function GetStepper(queue){
          console.log(queue.queue)
          let steps = []
          activestep =-1
          if (queue.queue.currentCall){

          if (queue.queue.currentCall.ucid) {
            activestep = 0
            steps.push(<Step><StepLabel>Call In Menus : {queue.queue.currentCall.origin}</StepLabel></Step>)
          if (queue.queue.currentCall.callType) {
            activestep = 1
            steps.push(<Step><StepLabel>Waiting Line : {queue.queue.currentCall.callType}</StepLabel></Step>)
          }
          else
          {
            steps.push(<Step><StepLabel>Client in menus</StepLabel></Step>)
          }
          }
          else{
            steps.push(<Step><StepLabel>No Calls</StepLabel></Step>)
            steps.push(<Step><StepLabel>Free</StepLabel></Step>)
          }
        }

      return (<Stepper activeStep = {activestep} alternativeLabel>{steps}</Stepper>)
    }

      return(<div><Grid container spacing={24} style={{ flexGrow: 1 }} >
        <Grid style={{ flex: 'auto', width:"15%", height: "135px", paddingRight:"0px", paddingLeft:"0px", paddingBottom:"10px"}} item xs><Card style={{ flex: 'auto', height: "135px" }}><CardHeader title="Queues Status"/>
      { this.props.agents.length >0 ? <TicketDrawer agents={this.props.agents} />:<div></div>}</Card></Grid>
        { this.props.queues && this.props.queues.map((queue) => { return (
          <Grid style={{ flex: 'auto', height: "145px" ,width:"25%",paddingRight:"0px", paddingLeft:"0px"}} key={queue.ext} item xs>
          <GetStepper queue={queue} />
        </Grid>)})}
      </Grid>
        </div>
      ); 
    }
  }
