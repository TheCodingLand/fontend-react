
import React from 'react';

import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { observer } from "mobx-react";
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';

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