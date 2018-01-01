
import React from "react";
import logo from '../../logo.svg';
// let defaultStyle = { 
//     color : '#fff' 
//   };
export default class MapPanel extends React.Component {
    render () {
      return(
        <div>
         <h3>map</h3>
         <img className="img-responsive" src={logo} alt="logo"/>
        </div>
      ); 
    }
  }