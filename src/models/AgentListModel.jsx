import { observable, computed, action, async } from "mobx";
import DataProvider from './../DataProvider'
import AgentModel from "./AgentModel";


export default class AgentListModel {
  constructor() {
    this.agents = this.GetAgentList()
    this.ds = new DataProvider();  
 }


  @observable agents = [];

  

  @computed
  get loggedInAgentsCount() {
    return this.agents.filter(agent => agent.state).length;
  }

  @action
  addAgent(agent) {
    this.agents.push(new AgentModel(agent.login, agent.firstname))
  }

  @action
  async GetAgentList() {
    
    return await this.ds.ListAgents()
    
  
    
    
  }

}
