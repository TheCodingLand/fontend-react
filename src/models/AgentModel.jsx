import { observable } from "mobx";

export default class AgentModel {
  
  @observable login;
  @observable firstname;


  constructor(login,firstname) {
    this.firstname = firstname;
    this.login = login;
  }
}