import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PokeBallIcon from './images/poke-ball-icon.png';

function App() {

  const [activeFilter, setActiveFilter] = useState("fire")
  const [listType, setListType] = useState([])

  const getDataPokemon = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        console.log(res.data)
      })
  }

  const getDataType = () => {
    axios.get("https://pokeapi.co/api/v2/type")
      .then(res => {
        console.log(res.data)
      })
  }

  useEffect(() => {
    getDataPokemon()
    getDataType()
  },[])

  return (
    <div className="App">
      <Header />
      <div className="main-body">
        <div className="filter-button-wrapper">
          {/* <button className="button-filter fire-color">
              Fire
              <img className="pokeball-icon" src={PokeBallIcon} />
          </button>
          <button className="button-filter water-color">water</button>
          <button className="button-filter grass-color">grass</button>
          <button className="button-filter flying-color">flying</button>
          <button className="button-filter electric-color">electric</button> */}

        </div>
      </div>
    </div>
  );
}

export default App;
