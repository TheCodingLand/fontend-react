import { observable, computed, action, async } from "mobx";
import DataProvider from './../DataProvider'
import AgentModel from "./AgentModel";


export default class AgentListModel {
  constructor() {
    this.ds = new DataProvider();  
    this.GetAgentList()
      
 }


  @observable agents = [];

  

  @computed
  get loggedInAgentsCount() {
    return this.agents.filter(agent => agent.state).length;
  }

  @action
  addAgent(agent) {
    console.log(agent)
    this.agents.push(new AgentModel(agent.login, agent.firstname))
  }

  @action
  async GetAgentList() {
    
    //this.ds.ListAgents().then((data) => console.log(data))    
    this.ds.ListAgents().then((data) => this.onDataRecieved(data))
  }

  onDataRecieved(data) {
    var listofusers = [];
    if (data.data.allAgents) { listofusers = data.data.allAgents.edges.map((edge) => { return edge.node })}
    var users = { users : listofusers }
    
    listofusers.map((user) => this.addAgent(user))


    //this.setState( { serverData : { users : users.users } }
  }

}
