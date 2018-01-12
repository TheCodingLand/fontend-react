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
      {this.store.agents} ? <h1>{this.store.agents}</h1> :<h1> Loading</h1>
      </div>
    
     )
  }
    
  
}



export default App;