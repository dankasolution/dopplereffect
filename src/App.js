import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { DopplerEffect } from './components/DopplerEffect';

function App() {
  return (
    <Container
          className="App" 
          disableGutters={true}
          maxWidth={false}>
      <Container className="App-header" maxWidth={false}>
        <span>Doppler Effect</span>        
      </Container>
      <Container className="App-body" maxWidth={false}>
        <DopplerEffect /> 
      </Container>
    </Container>
  );
}

export default App;
