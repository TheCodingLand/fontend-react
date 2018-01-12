
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Websocket from 'react-websocket';
import io from 'socket.io-client';

export default class DataProvider {
    constructor() {
        

    this.client = new ApolloClient({
    link: new HttpLink({ uri: 'http://148.110.107.15:8099/graphql' }),
    cache: new InMemoryCache()
});
    let SOCKET_URL = "148.110.107.15:3001"
    this.socket = io.connect(SOCKET_URL);
    this.socket.on('message',((data) =>  { this.handleMessage(data)})  );
    }
handleMessage(data){
    //console.log(data)
    return data

}

async ListAgents() {
    let users = []
    console.log("retrieving agents from server")
    this.client.cache.reset(); 
    
    let data = await this.client.query({ query: gql`query {
          allAgents(phoneActive: true) {
            edges {
              node {
                id
                lastname
                firstname
                ext
                phoneLogin
                phoneState
              }
            }
          }
        }
        ` })
        
        return data
        
       
       }
       
    
      
async onDataRecieved (data,info) {
console.log("retrieved data, parsing result")

var listofusers = [];
if (data.data.allAgents) { listofusers = data.data.allAgents.edges.map((edge) => { return edge.node })}
info = listofusers;

//var users = { users : listofusers }
//console.log(users)
//return users
} 


}



