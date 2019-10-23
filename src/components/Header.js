import React, { useEffect, useState } from 'react';
import LogoPokemon from '../images/logo-pokemon.png';
import PokeBallIcon from '../images/poke-ball-icon.png';

function Header(props) {

  return (
    <div className="header">
        <img src={LogoPokemon} />
        <div className="filter-button-wrapper">
            <button className="button-filter fire-color">
                Fire
                <img className="pokeball-icon" src={PokeBallIcon} />
            </button>
            <button className="button-filter water-color">water</button>
            <button className="button-filter grass-color">grass</button>
            <button className="button-filter flying-color">flying</button>
            <button className="button-filter electric-color">electric</button>
        </div>
    </div>
  );
}

export default Header;
