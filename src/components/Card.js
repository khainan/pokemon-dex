import React, {useState} from 'react';
import PokeBallIcon from '../images/poke-ball-icon.png';


function Card(props) {

  const [seeDetail, setSeeDetail] = useState(false)

  return (
    <div key={props.index} className="card" onClick={() => setSeeDetail(!seeDetail)}>
      <div className="pokemon-id-wrapper">
        <img src={PokeBallIcon}/>
        <p className="pokemon-id">{props.data.convertedId}</p>
      </div>
      <img src={props.data.image} style={ seeDetail ? {width:"0"} : {}} />
      { seeDetail &&
          <div className="detail-pokemon">
            <div className="wrapper-stats">
              <h4>Stats:</h4>
              {
                props.data.stats.map(stats => <p>{stats.stat}: {stats.value}</p>)
              }
            </div>
            <div className="wrapper-stats">
              <h4>Abilities:</h4>
              {
                props.data.abilities.map(ability => <p>{ability}</p>)
              }
            </div>
          </div>
      }
      <p className="title-card">{props.data.name} <span className="see-detail">></span></p>
      <div className="attribute-wrapper">
      {
        props.data.type.map((type, index)=> <div key={index} className={`attribute ${type}-color`}>{type}</div>)
      }
      </div>
    </div>
  );
}

export default Card;
