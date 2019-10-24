import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PokeBallIcon from './images/poke-ball-icon.png';
import {CircleArrow as ScrollUpButton} from 'react-scroll-up-button';
import Loader from 'react-loading';

function App() {

  const [listType, setListType] = useState([])
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  const getDataPokemon = async (url) => {
    setLoading(true)
    await axios.get(url)
      .then(res => {
        let data = res.data.results ? res.data.results : res.data.pokemon
        data.map(data => setDataPokemon(data.pokemon ? data.pokemon.name : data.name, data.url))
    })
  }

  const getDataType = async () => {
    await axios.get("https://pokeapi.co/api/v2/type")
      .then(res => {
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
        const newObject = {
          name: name,
          url: url,
          image: imageUrl,
          id: id,
          type: type,
          convertedId: convertedId
        }

        pokemon.push(newObject)
        let sortedArray = [...pokemon]
        sortedArray = sortedArray.sort((a, b) => {return a.id - b.id})
        setPokemon(sortedArray)
        setLoading(false)
      })
  }

  const filterPokemonByType = (url) => {
    let clearArray = pokemon.splice(0, pokemon.length)
    setPokemon(clearArray)
    getDataPokemon(url)
  }

  useEffect(() => {
    getDataPokemon("https://pokeapi.co/api/v2/pokemon")
    getDataType()
  },[])

  return (
    <div className="App">
      <Header />
      <div className="main-body">
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={150}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
          style={{zIndex:"10"}}
          ToggledStyle={{}}
        />
        <p style={{margin:"0"}}>Filter by:</p>
        <div className="filter-button-wrapper">
          {
            listType.map((val, index) =>
              <div key={index} style={{cursor:"pointer"}} className={`attribute ${val.name}-color`} onClick={() => filterPokemonByType(val.url)}>{val.name}</div>
            )
          }
        </div>
        <div className="wrapper-list-pokemon">
          { !loading ?
            ( pokemon.map((data, index) =>
              <div key={index} className="card">
                <div className="pokemon-id-wrapper">
                  <img src={PokeBallIcon}/>
                  <p className="pokemon-id">{data.convertedId}</p>
                </div>
                <img src={data.image} />
                <p className="title-card">{data.name}</p>
                <div className="attribute-wrapper">
                {
                  data.type.map((type, index)=> <div key={index} className={`attribute ${type}-color`}>{type}</div>)
                }
                </div>
              </div>
            )
          )
          :
          <Loader
            type={"bars"}
            color={"#CC0000"}
            height={"50px"}
            width={"50px"}
          />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
