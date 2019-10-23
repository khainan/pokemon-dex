import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PokeBallIcon from './images/poke-ball-icon.png';

function App() {

  const [activeFilter, setActiveFilter] = useState("fire")
  const [listType, setListType] = useState([])
  const [pokemon, setPokemon] = useState([])

  const getDataPokemon = async () => {
    await axios.get("https://pokeapi.co/api/v2/pokemon")
      .then(res => {
        res.data.results.map(data => setDataPokemon(data.name, data.url))
    })
  }

  const getDataType = async () => {
    await axios.get("https://pokeapi.co/api/v2/type")
      .then(res => {
        console.log(res.data)
        setListType(res.data.results)
    })
  }

  const setDataPokemon = async (name, url) => {
    let id
    let imageUrl
    let type = []
    let convertedId

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        id = res.data.id
        convertedId = id > 99 ? id : id > 9 ? '0'+id : '00' + id
        imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${convertedId}.png`
        res.data.types.map(val => type.push(val.type.name))
      })
    const newObject = {
      name: name,
      url: url,
      image: imageUrl,
      id:id,
      type:type
    }

    pokemon.push(newObject)
    let newArray = [...pokemon]

    setPokemon(newArray)
  }

  useEffect(() => {
    getDataPokemon()
    getDataType()
  },[])

  console.log(pokemon)

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
        <div className="wrapper-list-pokemon">
          { pokemon && pokemon.map(data =>
            <div className="card">{data.name}
              <img src={data.image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
