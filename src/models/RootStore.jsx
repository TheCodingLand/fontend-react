import AgentListModel from './AgentListModel'
import io from 'socket.io-client';
import CallsListModel from './CallsListModel'

import DataProvider from './../DataProvider'


export default class RootStore {
    constructor() {
    this.lastUpdate = Date.now()
    this.lastUpdates =[]

    this.lastRedisUpdate = {}
    
    let SOCKET_URL = "ws.lbr.lu"
    this.ds = new DataProvider();  

    this.agentStore = new AgentListModel(this)
    this.callsStore = new CallsListModel(this)

    this.socket = io.connect(SOCKET_URL);
    this.socket.on('message',((data) =>  { this.handleRedisMessage(data)}));
    
    }
    updatePendingTickets(id){
        this.socket.send("updatetickets:"+id)
    }

    addUpdate(data){

    }

    handleRedisMessage(data){
        data = data.pl.replace('\\"', '"')
        data = JSON.parse(data)
        if (data.action === this.lastRedisUpdate.action && data.data === this.lastRedisUpdate.data) {
            if (Date.now() - this.lastUpdate > 100) {
                this.lastUpdate = Date.now()
                this.lastRedisUpdate = data
                this.agentStore.handleMessage(data)
                
            }
        }
        else {
            this.lastRedisUpdate = data
            this.lastUpdate = Date.now()
            this.agentStore.handleMessage(data)
            
        }
     } 
        }
         



  