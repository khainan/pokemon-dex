import React, { useEffect, useState } from 'react';
import LogoPokemon from '../images/logo-pokemon.png';

function Header(props) {

  return (
    <div className="header">
        <img src={LogoPokemon} />
    </div>
  );
}

export default Header;
