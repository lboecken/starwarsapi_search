import React from 'react';
import { nanoid } from 'nanoid';

function Table(props) {
  return (
    <div className='row mt-3'>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Homeworld</th>
            <th>Species</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {props.searchResults.map((character) => {
            return (
              <tr key={nanoid()}>
                <td>{character.name}</td>
                <td>{character.birth_year}</td>
                <td>{character.homeworld}</td>
                <td>{character.species}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
