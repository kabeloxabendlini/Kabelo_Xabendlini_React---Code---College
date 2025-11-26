// Import React and Component from the react library
import React, { Component } from 'react'; 

// Import the Products component from a local file
import Products from './Products'; 

// Define the App class component, extending React's Component
class App extends Component { 
  // The render method defines what this component will display
  render() { 
    return ( 
      <div> 
        {/* Main heading of the app */}
        <h1>My First React App!</h1> 

        {/* Render the Products component three times */}
        <Products /> 
        <Products /> 
        <Products /> 
      </div> 
    ); 
  }
} 

// Export the App component so it can be imported and used in other files
export default App; 
