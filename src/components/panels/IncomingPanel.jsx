
import * as React from 'react';
import Typography from 'material-ui/Typography';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Grid from 'material-ui/Grid';
// let defaultStyle = { 
//     color : '#fff' 
//   };
function getSteps() {
    return ['Call in Centrale', 'Client Waiting'];
  }

export default class IncomingPanel extends React.Component {
    state = {
        activeStep: -1,
      };

     

    render () {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
      return(
        <div><Grid container spacing={24}>
        <Grid item xs>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        </Grid>
        <Grid item xs>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        </Grid>
        <Grid item xs>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        </Grid>
      </Grid>
        
        </div>
      ); 
    }
  }