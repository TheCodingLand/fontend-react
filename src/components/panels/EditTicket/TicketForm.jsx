
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react";

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
             
    }
    getEvents() {
      
      console.log(this.props.agent)
      return this.props.agent.callsWithoutTickets.map((data) => {
        return <MenuItem value={data.id}>{data.start}</MenuItem>
      })

    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    render() {
      const menuitems = this.getEvents()
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
        <p>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="client">Client</InputLabel>
        
            <Select
            value=""
            onChange={this.handleChange}
            input={<Input name="name" id="client" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
           {menuitems}
          </Select>
          <FormHelperText>Select Client</FormHelperText>
        </FormControl>
        </p>
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
            />
            <TextField
              multiline
              id="solution"
              label="Solution"
              className={classes.textField}
              margin="normal"
            />
            
             
            </form>
  </div>            
    )

}
}

export default withStyles(styles)(TicketForm);