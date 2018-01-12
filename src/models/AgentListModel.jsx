import { observable, computed, action, async } from "mobx";
import DataProvider from './../DataProvider'
import AgentModel from "./AgentModel";
import Websocket from 'react-websocket';
import io from 'socket.io-client';

export default class AgentListModel {
  constructor() {
    let SOCKET_URL = "148.110.107.15:3001"
    this.socket = io.connect(SOCKET_URL);
    this.socket.on('message',((data) =>  { this.handleMessage(data)})  );
    this.ds = new DataProvider();  
    this.lastUpdate = Date.now() -25;
//    this.GetAgentList()
      
 }
  handleMessage(data){
    if (Date.now()- this.lastUpdate > 20){
      data = data.pl.replace('\\\"', '\"')
      console.log(JSON.parse(data))
      
      this.lastUpdate = Date.now()

      this.GetAgentList()
  }}

 @observable agents = [];

  @computed
  get loggedInAgentsCount() {
    return this.agents.filter(agent => agent.state).length;
  }

  @action
  addAgent(agent) {
    //console.log(agent)
    this.agents.push(new AgentModel(agent))
  }

  @action
  async GetAgentList() {
    
    //this.ds.ListAgents().then((data) => console.log(data))    
    this.ds.ListAgents().then((data) => this.onListRecieved(data))
  }

  onListRecieved(data) {
    var listofusers = [];
    if (data.data.allAgents) { listofusers = data.data.allAgents.edges.map((edge) => { return edge.node })}
    var users = { users : listofusers }
    this.agents = []
    listofusers.map((user) => this.addAgent(user))


    //this.setState( { serverData : { users : users.users } }
  }

  @action
  async GetAgent(login) {
    
    //this.ds.ListAgents().then((data) => console.log(data))    
    this.ds.GetAgent().then((data) => this.onAgentRecieved(data))

  }

  onAgentRecieved(data) {
    var listofusers = [];
    if (data.data.allAgents) { listofusers = data.data.allAgents.edges.map((edge) => { return edge.node })}
    var users = { users : listofusers }
    this.agents = []
    listofusers.map((user) => this.addAgent(user))


    //this.setState( { serverData : { users : users.users } }
  }


}
