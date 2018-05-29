import * as React from 'react';
//import AgentList from "./components/TodoList";
import CssBaseline from '@material-ui/core/CssBaseline';
import RootStore from "./models/RootStore";
import MainLayout from './components/MainLayout'
//<MainLayout users={this.state.serverData.users}/> 
import Loader from './components/Loader'
import DevTools from 'mobx-react-devtools';

//import Perf from 'react-addons-perf'; // ES6

class App extends React.Component {

  constructor() {
    super();
    this.store = new RootStore();
    this.store.agentStore.GetAgentList()
    this.store.agentStore.GetQueuesList()
    this.getCategories().then(
        (categories) => categories.filter(category => category.state === "Active")).then(
            (categories) => this.setState({categories:categories}))
  }
  state = {
    categories : [],
    loaded:false
  }

  getCategories() {
    

    let query = {
      
        objectclass: "Category",
        filter: "",
        variables: [
        ],
        requiredfields: [
          "Path",
          "State"
        ]
    }
      return fetch('http://148.110.107.15:5001/api/ot/objects', {
          method: 'POST',
          body: JSON.stringify(query),
          headers: { 'Accept': 'application/json',
          'Content-Type': 'application/json'}
      }
      ).then(response => response.json()
          ).then(
              (response) => response.Category.map( (category) => {  return { id: category.id, title : category.data.Path, state : category.data.State} } ) )
    }

    
  

render() {
  //Perf.start()
    return(
      <div>
       
     <CssBaseline  />
     {this.state.categories!==[]?<MainLayout categories={this.state.categories} store={this.store}/>:<Loader /> 
    }
     </div>
     )
//     Perf.stop()
  }
}

//<AgentList store={this.store} />

export default App;