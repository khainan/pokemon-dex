import React, { useEffect, useState } from 'react';
import LogoPokemon from './images/logo-pokemon.png';
import axios from 'axios';
import './App.css';
import Card from './components/Card';
import Loader from 'react-loading';

function App() {

  const [listType, setListType] = useState([])
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [nextData, setNextData] = useState("")
  const [scrollPosition, setScroll] = useState(0)
  const [currentHeight, setHeight] = useState(0)

  const getDataPokemon = async (url) => {
    await axios.get(url)
      .then(res => {
        let data = res.data.results ? res.data.results : res.data.pokemon
        let nextUrl = res.data.next ? res.data.next : ""
        alert('masuk')
        setNextData(nextUrl)
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
    let abilities = []
    let moves = []
    let stats = []

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        id = res.data.id
        convertedId = id > 99 ? id : id > 9 ? '0'+id : '00' + id
        imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${convertedId}.png`

        res.data.types.map(val => type.push(val.type.name))
        res.data.abilities.map(val => abilities.push(val.ability.name))
        res.data.moves.map(val => moves.push(val.move.name))
        res.data.stats.map(val => stats.push({stat:val.stat.name, value: val.base_stat}))


        const newObject = {
          name: name,
          url: url,
          image: imageUrl,
          id: id,
          type: type,
          convertedId: convertedId,
          moves: moves,
          abilities: abilities,
          stats: stats
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

  const getDataOnScroll = (scrollHeight, clientHeight, scrollTop) => {
    let currentScroll = scrollHeight - clientHeight
    setScroll(scrollTop)
    setHeight(currentScroll)
    // if((currentScroll === scrollTop) && nextData){
    //   getDataPokemon(nextData)
    // }
  }

  const scrollToTop = () => {
    document.getElementById('App').scrollTo(0, 0)
  }

  useEffect(() => {
    getDataPokemon("https://pokeapi.co/api/v2/pokemon")
    getDataType()
  },[])

  useEffect(() => {
    if((currentHeight === scrollPosition) && nextData){
      getDataPokemon(nextData)
    }
  },[scrollPosition])

  return (
    <div className="App" id="App" onScroll={(e) => getDataOnScroll(e.currentTarget.scrollHeight, e.currentTarget.clientHeight, e.currentTarget.scrollTop)}>
      <div className="header">
        <img src={LogoPokemon} />
      </div>
      <div className="main-body">
        <p style={{margin:"0"}}>Filter by:</p>
        <div className="filter-button-wrapper">
          {
            listType.map((val, index) =>
              <div
                key={index}
                style={{cursor:"pointer"}}
                className={`attribute ${val.name}-color`}
                onClick={() => { filterPokemonByType(val.url); setLoading(true) }}
              >
              {val.name}
              </div>
            )
          }
        </div>
        <div className="wrapper-list-pokemon">
          {
            !loading ?
              pokemon.map((data, index) =>
                <Card
                  data={data}
                  index={index}
                />
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
        <button className="button-scroll-up" onClick={() => scrollToTop()} style={scrollPosition > 150 ? {opacity:"1"} : {opacity:"0"}}>Scroll Up</button>
      </div>
    </div>
  );
}

export default App;