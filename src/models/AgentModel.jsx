import { observable } from "mobx";

export default class AgentModel {
  
  @observable login;
  @observable firstname;


  constructor(agent) {

    this.firstname = agent.firstname;
    this.lastname = agent.lastname;
    this.phoneLogin = agent.phoneLogin;
    this.ext = agent.ext;
    this.phoneState = agent.phoneState;

  }
}