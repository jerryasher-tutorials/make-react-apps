import React, { useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';

import './App.css';

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // if two picks match, flip them permanently
  useEffect(() => {
    if (flipped.length === 2) {
      let first = flipped[0];
      let second = flipped[1];
      if (doublePokemon[first].name === doublePokemon[second].name) {
        setMatched(matched => [...matched, first, second]);
      }
    }
  }, [flipped]);

  // turn wrong picks back over
  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped]);

  // check for winning state
  useEffect(() => {
    if (matched.length === doublePokemon.length) {
      alert('winner');
    }
  }, [matched]);

  const flipCard = index => {
    setFlipped(flipped => [...flipped, index]);
  };

  const PokemonCard = ({ pokemon, isFlipped, flipCard, index }) => {
    return (
      <button
        onClick={() => flipCard(index)}
        className={`pokemon-card${isFlipped ? ' flipped' : ''}`}
      >
        <div className='inner'>
          <div className='front'>
            <img
              alt={pokemon.name}
              width='100'
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            />
          </div>
          <div className='back'>?</div>
        </div>
      </button>
    );
  };

  return (
    <div className='app'>
      <div className='cards'>
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <PokemonCard
              pokemon={pokemon}
              isFlipped={isFlipped}
              index={index}
              flipCard={flipCard}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
