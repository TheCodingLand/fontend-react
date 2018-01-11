import * as React from 'react';
//import AgentList from "./components/TodoList";
import Reboot from 'material-ui/Reboot';
import AgentListModel from "./models/AgentListModel";
import AgentModel from "./models/AgentModel";
//<MainLayout users={this.state.serverData.users}/> 





class App extends React.Component {
  constructor() {
    super();
    const store = new AgentListModel();
    store.GetAgentList()
    
  }

render() {
    return(
      <div>
     <Reboot />
     
      </div>
    
     )
  }
    
  
}



export default App;