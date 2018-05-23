
import React from 'react';
import Drawer from 'material-ui/Drawer';
import TicketForm from './TicketForm';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { observer } from "mobx-react";
const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
};

@observer
class TicketDrawer extends React.Component {
  
state ={
  open : false,
  ext : false,
  agent: false
}
handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
  
};

handleDrawerOpen = () => {
  this.setState({ open: true });
};
getExtsMenuItems(){
  console.log(this.props.agents)
  return this.props.agents.map((agent) => {
  return <MenuItem value={agent}>{agent.ext}</MenuItem> }
    )
}

handleDrawerClose = () => {
  this.setState({ open: false });
};

render() {
  const menuitems= this.getExtsMenuItems()
  const { classes } = this.props;
  const { open } = this.state;  
 return (
  
    <div>
      
      {this.state.ext ? <Button onClick={ () => {this.handleDrawerOpen();}}>Open Ticket</Button> :
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">My Extention</InputLabel>
          <Select
            value={this.state.agent}
            onChange={this.handleChange}
            input={<Input name="ext" id="age-helper" />}
          >
          {menuitems}
            
            
            
           
          </Select>
          
        </FormControl>}
 <Drawer
 anchor="bottom"
 open={this.state.open}
 onClose={ () => {this.handleDrawerClose();}}>
  <div>
          <div>
          
            <IconButton onClick={() => {this.handleDrawerClose;}}>
            <ExpandMoreIcon />
            </IconButton> :
          </div>
 
   <div><TicketForm agent={this.state.ext} /></div>
 </div>
</Drawer>
</div>
)}
}

export default withStyles(styles)(TicketDrawer);