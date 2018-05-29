
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
import CategoriesSelect from './CategoriesSelect';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  categoryField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 800,
  },
  menu: {
    width: 200,
  },
});


@observer
class TicketForm extends React.Component {
  suggestions = this.props.categories.map((category) => { return { label: category.title, id: category.id } })
  state = {
    event: '',
    title: '',
    description: '',
    solution: '',
    category: '',
    origin: '',
    client: '',
    events: this.props.agent.callsWithoutTickets,
    selectedEvent: {},
    response: {},


  }

  makeTicketSolved(response) {
    if (response.status !== "success") {
      //console.log("An Error Occured while making ticket solved")
    }
    else {


      let query = {
        State: "Solved"
      }

      return fetch('http://148.110.107.15:5001/api/ot/ticket/' + response.ticket, {
        method: 'PUT',
        body: JSON.stringify(query),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json()).then(() => this.linkEventToTicket(response.ticket, this.state.selectedEvent.otId))

    }
  }

  linkEventToTicket(ticketid, eventid) {
    let query = {
      RelatedIncident: ticketid
    }

    return fetch('http://148.110.107.15:5001/api/ot/event/' + eventid, {
      method: 'PUT',
      body: JSON.stringify(query),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    ).then(response => response.json()).then(response => this.setState({ response: response })).then(() => this.props.agent.callsWithoutTickets.remove(this.state.selectedEvent)).then(
      () => this.props.store.updatePendingTickets(this.state.selectedEvent.otId)).then(() =>

        this.setState({
          event: '',
          title: '',
          description: '',
          solution: '',
          category: '',
          origin: '',
          client: '',
          selectedEvent: {}
        }))
  }

  handleChangeCategory = name => title => {
    this.props.categories.forEach((category) => {
      if (category.title === title) {
        this.setState({ category: category.id })
      }
    })
  }


  handleTicketSubmit = (e) => {


    let ticket = {
      Title: this.state.title,
      Description: this.state.description,
      SolutionDescription: this.state.solution,
      AssociatedCategory: this.state.category,
      Applicant: this.props.agent.otUserdisplayname,
      Responsible: this.props.agent.otUserdisplayname
    }

    return fetch('http://148.110.107.15:5001/api/ot/tickets', {
      method: 'PUT',
      body: JSON.stringify(ticket),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()).then(response => this.makeTicketSolved(response))
  }

  //getEvents() {
  //  this.setState({ events: this.props.agent.callsWithoutTickets })
  //}

  componentDidMount() {
    //this.getEvents()

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }
    )
  }

  handleEventChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.state.events.forEach((e) => {
      if (e) {
        if (e.id === event.target.value) {
          this.setState({ selectedEvent: e, origin: e.origin })
        }
      }
    })
  };
  render() {
    let menuitems = []
    if (this.state.events.length > 0) {

      menuitems = this.state.events.map((event) => { if (event) { return <MenuItem origin={event.origin} value={event.id}>{event.start}</MenuItem> } })

    }
    else {
      menuitems = [<MenuItem origin="nothing" value="None">None</MenuItem>,]
    }
    const { classes } = this.props;

    return (<div>
      <form className={classes.container} noValidate autoComplete="off">
        <p>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="event">Event</InputLabel>

            <Select
              required
              value={this.state.event}

              onChange={this.handleEventChange('event')}

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
          disabled
          onChange={this.handleEventChange('origin')}
          value={this.state.origin}
        />
       
        <TextField
          required
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          onChange={this.handleEventChange('title')}
        />

        <TextField
          required
          multiline
          id="description"
          label="Description"
          className={classes.textField}
          margin="normal"
          rowsMax="4"
          onChange={this.handleChange('description')}
        />
        <br />
        <TextField
          required
          rowsMax="4"
          id="solution"
          label="Solution"
          className={classes.textField}
          margin="normal"
          multiline
          
          onChange={this.handleChange('solution')}
        />
        <div style={{width:'800px'}}><p>
       
        <CategoriesSelect categories={this.props.categories}
          required
          onSelect={this.handleChangeCategory()}
          
        />
        </p>
        </div>
        <div style={{width:'100%'}}>
        
        <Button onClick={this.handleTicketSubmit}>Valider</Button>
        <TextField
          color="secondary"
          disabled
          id="response"
          label="response"
          className={classes.textField}
          margin="normal"
          rowsMax="4"
          value={this.state.response.status ? this.state.response.status : "none"}

        />
       </div>
      </form>
    </div>
    )

  }
}

export default withStyles(styles)(TicketForm);
