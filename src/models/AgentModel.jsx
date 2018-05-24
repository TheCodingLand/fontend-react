import { observable, action } from "mobx";
import DataProvider from './../DataProvider'



export default class AgentModel {

  @observable phoneLogin;
  @observable firstname;
  @observable lastname;
  @observable phoneState;
  @observable currentCall;
  @observable totalcalls;
  @observable callsWithoutTickets;
  constructor(agent) {

    this.ds = new DataProvider();

    this.firstname = agent.firstname;
    this.lastname = agent.lastname;
    this.phoneLogin = agent.phoneLogin;
    this.ext = agent.ext;
    this.phoneState = agent.phoneState;
    this.totalcalls = "";
    this.currentCall = { ucid: "", origin: "", start: "", destination: "", callType: "", tickets: [] }
    this.totalcalls = this.getTotalCalls()
    this.callsWithoutTickets = this.getCallsWithoutTickets()
    this.currentUser = this.isCurrentUser

    
   

    if (agent.currentCall) {
      if (agent.currentCall.ucid) {

        this.currentCall = { ucid: agent.currentCall.ucid, origin: agent.currentCall.origin, start: agent.currentCall.start, destination: agent.currentCall.destination, callType: agent.currentCall.callType, tickets: [] }
        if (agent.currentCall.origin != "False") {
        this.ds.getTicketbyPhone(agent.currentCall.origin).then((data) => this.onTicketsRecieved(data))
        }
        
      }
    }
  }

  @action 
  isCurrentUser(ext) {
    if (this.ext===ext)
    {
     return true
    }
    else {
      return false
    }
  }

  @action
  updateState(state) {
    this.phoneState = state;
    if (this.currentUser) {
      this.getCallsWithoutTickets()
    }
  }

  @action
  removeCall() {
    this.currentCall.ucid = ""
    this.currentCall.origin = ""
    this.currentCall.start = ""
    this.currentCall.destination = ""
    this.currentCall.callType = ""
    this.currentCall.tickets = null
    this.totalcalls= this.getTotalCalls()
    this.callsWithoutTickets = []
    if (this.currentUser) {
      this.getCallsWithoutTickets()
    }

    console.log("calling Remove Call")
  }



@action
onCallListRecieved(data) {
  this.totalcalls = data.data.allCalls.edges.length
}


  getTotalCalls(){
    this.ds.getCallsbyAgentExt(this.ext).then((data) => this.onCallListRecieved(data))
  }


@action
onCallsWithoutTicketsRecieved(data){
  let events= []
  events= data.data.allCalls.edges.map((data) => { if (!data.node.event.edges.node){
  let event=  {'id':data.node.ucid, 'start':data.node.start, 'origin':data.node.origin}
  console.log(event)
 return event
}
}
)

this.callsWithoutTickets = events

}

  @action
  getCallsWithoutTickets() {
    console.log("got calls without tickets")
    this.ds.getEventsbyAgentExt(this.ext).then((data) => { this.onCallsWithoutTicketsRecieved(data)
    
  
})
}
    



  

  @action
  setCall(call) {

    this.currentCall.ucid = call.ucid

    this.currentCall.start = call.start
    this.currentCall.destination = call.destination
    this.currentCall.callType = call.callType
    if (call.origin !== "False") {
      this.currentCall.origin = call.origin
      this.ds.getTicketbyPhone(call.origin).then((data) => this.onTicketsRecieved(data))
    }
    else {
      this.currentCall.origin = "hidden"
    }
  }

  @action
  onTicketsRecieved(data) {
    this.currentCall.tickets = data.data.allEvents.edges.map((edge) => {

      if (edge.node.ticket) {
        console.log(edge)
        console.log(edge.node.ticket.title)

        return edge.node.ticket
      }
      else {
        return ""
      }
    }
    )

  }

  @action
  updateCall(ucid) {
    this.ds.GetCall(ucid).then((data) => this.onCallRecieved(data))
  }

  @action
  ticketByPhone(phonenumber) {

  }

  onCallRecieved(data) {

    let listofcalls = [];
    if (data.data.allCalls) { listofcalls = data.data.allCalls.edges.map((edge) => { return edge.node }) }

    if (listofcalls.length > 0) {

      this.setCall(listofcalls[0])
    }
  }
}