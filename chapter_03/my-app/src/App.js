// Import React and Component from the react library
import React, { Component } from 'react'; 

// Import the Products component from a local file
import Products from './Products';

// Import the Button component from a local file
import { Button } from 'react-bootstrap';

import Rating from './Rating';

// Define the App class component, extending React's Component
class App extends Component { 
  // The render method defines what this component will display
  render() {    
    const isValid = true; 
 
    return ( 
      <div> 
        <Products />   
        <Button variant="primary" disabled={!isValid}>Default</Button>               
      </div> 
    ); 
  }
}

// Export the App component so it can be imported and used in other files


class App extends Component {
  render() {        
    return (
      <div>
        <Rating rating="1"/>
        <Rating rating="2"/>
        <Rating rating="3"/>
        <Rating rating="4"/>
        <Rating rating="5"/>      
      </div>
    );
  }
}

export default App;
 
 

