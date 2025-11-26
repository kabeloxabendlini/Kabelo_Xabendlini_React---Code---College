import React, { Component } from 'react';
import Products from './Products';
import { Button } from 'react-bootstrap';

class App extends Component {
  render() {
    const isValid = true;

    return (
      <div>
        <Products />
        {/* Button is disabled when isValid is false */}
        <Button variant="primary" disabled={!isValid}>
          Default
        </Button>
      </div>
    );
  }
}

export default App;
