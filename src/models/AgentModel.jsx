import { observable, action } from "mobx";




export default class AgentModel {

  @observable phoneLogin;
  @observable firstname;
  @observable lastname;
  @observable phoneState;
  @observable currentCall;
  @observable totalcalls;
  @observable callsWithoutTickets;
  @observable otUserdisplayname;
  constructor(agent, rootstore) {
    //console.log"Agent Constructor")
    this.ds = rootstore.rootStore.ds;

    this.firstname = agent.firstname;
    this.lastname = agent.lastname;
    this.phoneLogin = agent.phoneLogin;
    this.ext = agent.ext;
    this.phoneState = agent.phoneState;
    this.totalcalls = "";
    this.currentCall = { ucid: "", origin: "", start: "", destination: "", callType: "", tickets: [] }
    this.totalcalls = 0;
    this.callsWithoutTickets = []
    this.currentUser = false
    this.otUserdisplayname = agent.otUserdisplayname
    this.getCallsWithoutTickets()
    

    if (agent.currentCall) {
      if (agent.currentCall.ucid) {
        this.currentCall = { ucid: agent.currentCall.ucid, origin: agent.currentCall.origin, start: agent.currentCall.start, destination: agent.currentCall.destination, callType: agent.currentCall.callType, tickets: [] }
        if (agent.currentCall.origin !== "False") {
          this.ds.getTicketbyPhone(agent.currentCall.origin).then((data) => this.onTicketsRecieved(data))
        }
      }
    }
  }

  @action
  setCurrentUser() {
    //console.log"setCurrentUser")
    this.currentUser = true
  }

  @action
  updateState(state) {
    //console.log"updateState")
    this.phoneState = state;
    //this.getCallsWithoutTickets()
  }

  @action
  removeCall() {
    //console.log"removeCall")
    this.currentCall.ucid = ""
    this.currentCall.origin = ""
    this.currentCall.start = ""
    this.currentCall.destination = ""
    this.currentCall.callType = ""
    this.currentCall.tickets = null
    
  }





  onCallsWithoutTicketsRecieved(data) {
    this.totalcalls = data.data.allCalls.edges.length
    let events = []
    events = data.data.allCalls.edges.reduce((filtered, data) => {
      if (data.node.event.edges[0]) {
        if (data.node.event.edges[0].node.otId) {
          if (!data.node.event.edges[0].node.ticket) {
            const d = new Date(data.node.start)
            let event = { 'id': data.node.ucid, 'start': d.toString(), 'origin': data.node.origin, 'otId': data.node.event.edges[0].node.otId }
            filtered.push(event)
          }
        }
      }
      return filtered


    },[])
 

    this.callsWithoutTickets = events


  }

  
  getCallsWithoutTickets() {
    //console.log"GetCallsWithoutTickets")
    this.ds.getEventsbyAgentExt(this.ext).then((data) => { this.onCallsWithoutTicketsRecieved(data) })
  }


  @action
  setCall(call) {
    //console.log"SetCall" + call.ucid)
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
    this.getCallsWithoutTickets()
  }


  onTicketsRecieved(data) {
    //console.log"OnTicketsRecieved")
    this.currentCall.tickets = data.data.allEvents.edges.reduce((filtered,edge) => {
      if (edge.node.ticket) {
         filtered.push(edge.node.ticket)
      }
      return filtered}
    ,[])

    
    
    
  /*   this.currentCall.tickets = data.data.allEvents.edges.map((edge) => {
      if (edge.node.ticket) {
        return edge.node.ticket
      }
      else {
        return ""
      }
    }
    ) */

  }

  @action
  updateCall(ucid) {
    //console.log"UpdateCall")
    this.ds.GetCall(ucid).then((data) => this.onCallRecieved(data))

  }

  
  onCallRecieved(data) {
    //console.log"onCallRecieved")


    let listofcalls = [];
    if (data.data.allCalls) { listofcalls = data.data.allCalls.edges.map((edge) => { return edge.node }) }

    if (listofcalls.length > 0) {

      this.setCall(listofcalls[0])

    }
  }
}