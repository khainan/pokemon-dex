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
            <div className="detail-pokemon" style={ seeDetail ? {width:"88%"} : {}}>
              <h4 className="title-stats">Stats:</h4>
              <div className="wrapper-stats">
                {
                  props.data.stats.map(stats => <p className={`p-stats ${stats.stat}`}>{stats.stat} {stats.value}</p>)
                }
              </div>
              <h4 className="title-stats">Abilities:</h4>
              <div className="wrapper-stats">
                {
                  props.data.abilities.map(ability => <p className="p-stats ability">{ability}</p>)
                }
              </div>
              <h4 className="title-stats">Moves:</h4>
              <div className="wrapper-stats">
                {
                  props.data.moves.slice(0, 4).map(moves => <p className="p-stats moves">{moves}</p>)
                }
              </div>
            </div>
        }
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
