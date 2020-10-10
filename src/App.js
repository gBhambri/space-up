import React from 'react';
import './App.css';
import Header from './Header/Header'
import AsteroidBelt from './AsteroidBelt/AsteroidBelt.js'

function App() {
  return (
    <div className="App">
    <div className="table-container">
        <Header />
        <AsteroidBelt />
    </div>
      
    </div>
  );
}

export default App;
