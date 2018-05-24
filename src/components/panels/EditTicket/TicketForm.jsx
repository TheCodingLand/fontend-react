
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });


@observer
class TicketForm extends React.Component {
    state = {
        event: '',
        client: '',
        events: [],
        selectedEvent: {}
     
             
    }
    getEvents() {
      
      console.log(this.props.agent)
     
      this.setState({events : this.props.agent.callsWithoutTickets})
      console.log(this.state)
      }
      
    componentDidMount(){
      this.getEvents()
    }
    

    
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        this.state.events.forEach((e) => {
          if (e.id ==event.target.value) {
            console.log(e)
            this.setState({selectedEvent:e})
            }
          })
        
        
      };
    render() {
      
      const menuitems = this.state.events.map((event) => <MenuItem origin={event.origin} value={event.id}>{event.start}</MenuItem> )
        const { classes } = this.props;
    
        return (<div>
          <form className={classes.container} noValidate autoComplete="off">
          <p>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="event">Event</InputLabel>
        
            <Select
            value={this.state.event}

            onChange={this.handleChange('event')}
            
          >
            {menuitems}
          </Select>
          <FormHelperText>Select your Event</FormHelperText>
        </FormControl>
        </p>
        
        <TextField
              id="origin"
              label="call origin"
              className={classes.textField}
              margin="normal"
              value={this.state.selectedEvent.origin}
            />
        <TextField
              id="client"
              label="Client info"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              margin="normal"
            />
         <TextField
              required
              id="category"
              label="Category"
              defaultValue=""
              className={classes.textField}
              onChange={this.handleChange('category')}
              margin="normal"
            />
            <TextField
              multiline
              id="description"
              label="Description"
              className={classes.textField}
              margin="normal"
              multiline
              rows="4"
            />
            <TextField
              multiline
              id="solution"
              label="Solution"
              className={classes.textField}
              margin="normal"
              multiline
              rows="4"
            />
            
            <Button onclick>Valider</Button> 
            </form>
  </div>            
    )

}
}

export default withStyles(styles)(TicketForm);