import React from 'react'
import Jumbotron from './Jumbotron';

function App() {
  return (
    <div>
      <Jumbotron />
      <Jumbotron>
      This is a long sentence, and I want to insert content into the jumbotron component from the outside.
      </Jumbotron>
    </div>
  )
}

export default App
