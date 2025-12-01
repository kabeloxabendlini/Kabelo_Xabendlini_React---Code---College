import React, { Component } from 'react'; 
import * as firebase from 'firebase'; 
 
class User extends Component { 
 
  constructor(props){ 
    super(props);         
    this.state = { 
        users: []        
    };     
  }   
 
  componentDidMount(){ 
    firebase.database().ref('/') 
      .on('value',snapshot => { 
        console.log(snapshot.val())                
      });            
  }  
 
  render() { 
    return ( 
      <div>         
      </div>
 
    ); 
  } 
} 
 
export default User;