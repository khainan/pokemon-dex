import React from 'react';
import PokeBallIcon from '../images/poke-ball-icon.png';


function Card(props) {

  return (
    <div key={props.index} className="card">
      <div className="pokemon-id-wrapper">
        <img src={PokeBallIcon}/>
        <p className="pokemon-id">{props.data.convertedId}</p>
      </div>
      <img src={props.data.image} />
      <p className="title-card">{props.data.name}</p>
      <div className="attribute-wrapper">
      {
        props.data.type.map((type, index)=> <div key={index} className={`attribute ${type}-color`}>{type}</div>)
      }
      </div>
    </div>
  );
}

export default Card;
