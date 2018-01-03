import * as React from 'react';

import MainLayout from './components/MainLayout'
//import styled from "styled-components";
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Websocket from 'react-websocket';

const fakeUsers = { users :  [
        { id : "1", 
        ext : "ext 1" , 
        prenom : "prenom 1",
        nom : "nom 1"
        }, 
        { id : "2", 
        ext: "ext 2" , 
        prenom : "prenom 2",
        nom : "nom2"
        },  
        { id : "3", 
        ext: "ext 3" , 
        prenom : "prenom 3",
        nom : "nom 3"
        },  
        { id : "4", 
        ext: "ext 4" , 
        prenom : "prenom 4",
        nom : "nom 4"
        },  
        { id : "5", 
        ext: "ext 5" , 
        prenom : "prenom 5",
        nom : "nom 5"
        },
        ]}
  



class App extends React.Component {
  constructor () {
    super();
    // this.client = new ApolloClient({
    //   link: new HttpLink({ uri: 'http://192.168.1.22:8099/graphql' }),
    //   cache: new InMemoryCache()
    // });
    this.state ={ serverData : {} };
  };

  // handleData(data) {
  //   let result = JSON.parse(data);
  //   console.log(result);
  // }

     
  // onDataRecieved (data) {
  //   console.log(data)
  //   this.setState(data)

  // } 

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData : fakeUsers}); 
    }, 5000);

    // this.client.query({ query: gql`{agents{id,lastname, firstname, ext}}` }).then(this.onDataRecieved.bind(this))
    // setInterval(() => {this.client.cache.reset(),3000; 
    
    // this.client.query({ query: gql`{agents{id,lastname, firstname, ext}}` }).then(this.onDataRecieved.bind(this)) }, 1000 );
    // <Websocket url='ws://localhost:3001/agents'
    //           onMessage={this.handleData.bind(this)}/>
  }


  render() {
    return(
      this.state.serverData.users ? <MainLayout users={this.state.serverData.users}/> : <div><h1>loading</h1></div>
     )
  }
    
  }


export default App;
