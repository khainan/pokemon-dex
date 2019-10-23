import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type/7/")
      .then(res => {
        console.log(res.data)
      })
  })

  return (
    <div className="App">

    </div>
  );
}

export default App;
