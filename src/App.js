import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';

function App() {

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type/7/")
      .then(res => {
        console.log(res.data)
      })
  })

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
