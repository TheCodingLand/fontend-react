
import AgentItem from './AgentComponents/AgentItem';
import { Grid, Cell } from 'styled-css-grid';
import React from "react";
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Websocket from 'react-websocket';
//import styled from "styled-components";

// let defaultStyle = { 
//     color : '#fff' 
//   };


export default class AgentPanel extends React.Component {
    constructor() {
      super();
      this.client = new ApolloClient({
        link: new HttpLink({ uri: 'http://192.168.1.22:8099/graphql' }),
        cache: new InMemoryCache()
      });
      this.state =  {"data":{"agents":[{"id":"2","lastname":null,"firstname":null,"ext":"573","__typename":"AgentType"},]}}
      
    }

    handleData(data) {
      let result = JSON.parse(data);
      console.log(result);
    }


    componentDidMount() {
      this.client.query({ query: gql`{agents{id,lastname, firstname, ext}}` }).then(this.onDataRecieved.bind(this))
      setInterval(() => {this.client.cache.reset(),3000; 
        this.client.query({ query: gql`{agents{id,lastname, firstname, ext}}` }).then(this.onDataRecieved.bind(this)) }, 1000 );

    }
    // generateRow(agent) {
    //   return (<Cell id={agent.id} width={6} height={1}><AgentDetails/></Cell>);
    // }

    //cells = this.state.agents.map(generateRow(this));
    // foreach this.state ) {
    //   cellgroups = cellgroups + <Cell width={6} height={1}><AgentDetails/></Cell>
    //                 <Cell width={6} height={1}><AgentStats/></Cell>
    // }
    

    
    
    onDataRecieved (data) {
      console.log(data)
      this.setState(data)
      

    } 

    render () {
      
    //const cells= this.state.agents.map(<AgentItem/>);  
    //const cells= this.state.forEach(element => { return( <AgentItem/>)});  
    console.log(this.state);
    console.log();
    if (Object.keys(this.state).length === 0){
      return (<Cell width={12}></Cell>)
    }
    else
    {
    return(
    <Cell width={12}>
      {
        console.log(this.state.data.agents)}
        {
        this.state.data.agents.map(function(l){
          return <AgentItem key ={l.id} id={l.id} prenom={l.prenom} ext={l.ext} nom={l.nom}/>;
        })
      }
       <Websocket url='ws://localhost:3001/agents'
              onMessage={this.handleData.bind(this)}/>
     </Cell>   
      ); 
    }
  }
};

