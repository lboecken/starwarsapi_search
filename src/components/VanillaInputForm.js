import React, { useState } from 'react';

function VanillaInputForm() {
  const [category, setCategory] = useState('people');
  const [searchTerm, setSearchTerm] = useState('Skywalker');
  const [searchResults, setSearchResults] = useState('');

  function handleChangeCategory(value) {
    setCategory(value);
  }
  function handleChangeSearchTerm(value) {
    setSearchTerm(value);
  }

  async function handleSearch(event) {
    event.preventDefault();
    switch (category) {
      case 'people': {
        let response = await fetch(
          `https://swapi.dev/api/${category}/?search=${searchTerm}`
        );
        let responseJSON = await response.json();
        let searchResults = await responseJSON.results;
        searchResults = await getHomeworld(searchResults);
        searchResults = await getSpecies(searchResults);
        console.table(searchResults);
        setSearchResults(searchResults);
        break;
      }
      case 'starships' || 'films': {
        let response = await fetch(
          `https://swapi.dev/api/${category}/?search=${searchTerm}`
        );
        let responseJSON = await response.json();
        let searchResults = await responseJSON.results;
        console.table(searchResults);
        setSearchResults(await searchResults);
        break;
      }
    }
  }

  async function getHomeworld(searchResults) {
    const updatedSearchResults = await Promise.all(
      searchResults.map(async (result) => {
        let planetSearch = await fetch(result.homeworld);
        let planetSearchJSON = await planetSearch.json();
        result.homeworld = await planetSearchJSON.name;
        return result;
      })
    );
    return updatedSearchResults;
  }

  async function getSpecies(searchResults) {
    const updatedSearchResults = await Promise.all(
      searchResults.map(async (result) => {
        let speciesSearch;
        if (result.species.length === 0) {
          speciesSearch = await fetch('https://swapi.dev/api/species/1');
          let speciesSearchJSON = await speciesSearch.json();
          result.species = await speciesSearchJSON.name;
          console.table(result);
          return result;
        } else {
          speciesSearch = await fetch(result.species[0]);
          let speciesSearchJSON = await speciesSearch.json();
          result.species = await speciesSearchJSON.name;
          console.table(result);
          return result;
        }
      })
    );
    return updatedSearchResults;
  }

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <select onChange={(e) => handleChangeCategory(e.target.value)}>
        <option value='people'>people</option>
        <option value='starships'>starships</option>
        <option value='films'>films</option>
      </select>
      <input
        type='text'
        onChange={(e) => handleChangeSearchTerm(e.target.value)}
        placeholder='searchTerm'
        value={searchTerm}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default VanillaInputForm;
