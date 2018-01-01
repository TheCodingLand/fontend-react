import * as React from 'react';

import { Grid, Cell } from 'styled-css-grid';
import AgentPanel from './panels/AgentPanel';
import ClientPanel from './panels/ClientPanel';
import TicketsPanel from './panels/TicketsPanel';
import StatsPanel from './panels/StatsPanel';
import MapPanel from './panels/MapPanel';
var letterStyle = {
    padding: 10,
    margin: 10,
    fontFamily: "Railway",
    fontSize: 14,
    textAlign: "center"
  };
export default class Layout extends React.Component {
    render() {
        return(
        <Grid style={letterStyle} columns={4}>
            <Cell width={1} height={2}><AgentPanel/></Cell>
            <Cell width={1} height={2}><ClientPanel/></Cell>
            <Cell width={1} height={2}><TicketsPanel/></Cell>
            <Cell width={1} height={2}>
                <Grid columns={1}>
                    <Cell width={1} height={1}><StatsPanel/></Cell>
                    <Cell width={1} height={1}><MapPanel/></Cell>
                </Grid>
            </Cell>
        </Grid>
        );
    };
}
