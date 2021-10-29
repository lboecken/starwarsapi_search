import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Table from './components/Table';
import SearchNavBar from './components/SearchNavBar';
import MethodSelector from './components/MethodSelector';

function App() {
  const [searchResults, setSearchResults] = useState({
    next: null,
    previous: null,
    data: [],
  });
  const [searchTerm, setSearchTerm] = useState();
  const [isAxiosOrVanilla, setAxiosOrVanilla] = useState('axios');
  const axios = require('axios');

  useEffect(() => {
    handleSearch();
  }, []);

  async function handleSearch(
    event = null,
    url = 'https://swapi.dev/api/people/?search='
  ) {
    try {
      event && event.preventDefault();
      if (isAxiosOrVanilla === 'vanilla') {
        let response = await fetch(url);
        let responseJSON = await response.json();
        let searchResultsData = await responseJSON.results;
        searchResultsData = await getHomeworld(searchResultsData);
        searchResultsData = await getSpecies(searchResultsData);
        setSearchResults({
          next: responseJSON.next,
          previous: responseJSON.previous,
          data: searchResultsData,
        });
      } else if (isAxiosOrVanilla === 'axios') {
        let response = await axios.get(url);
        let searchResultsData = await response.data.results;
        searchResultsData = await getHomeworld(searchResultsData);
        searchResultsData = await getSpecies(searchResultsData);
        setSearchResults({
          next: response.data.next,
          previous: response.data.previous,
          data: searchResultsData,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getHomeworld(searchResults) {
    if (isAxiosOrVanilla === 'vanilla') {
      const updatedSearchResults = await Promise.all(
        searchResults.map(async (result) => {
          let planetSearch = await fetch(result.homeworld);
          let planetSearchJSON = await planetSearch.json();
          result.homeworld = await planetSearchJSON.name;
          return result;
        })
      );
      return updatedSearchResults;
    } else if (isAxiosOrVanilla === 'axios') {
      const updatedSearchResults = await Promise.all(
        searchResults.map(async (result) => {
          let planetSearch = await axios.get(result.homeworld);
          result.homeworld = planetSearch.data.name;
          return result;
        })
      );
      return updatedSearchResults;
    }
  }

  async function getSpecies(searchResults) {
    if (isAxiosOrVanilla === 'vanilla') {
      const updatedSearchResults = await Promise.all(
        searchResults.map(async (result) => {
          let speciesSearch;
          if (result.species.length === 0) {
            speciesSearch = await fetch('https://swapi.dev/api/species/1');
            let speciesSearchJSON = await speciesSearch.json();
            result.species = await speciesSearchJSON.name;
            return result;
          } else if (isAxiosOrVanilla === 'axios') {
            speciesSearch = await fetch(result.species[0]);
            let speciesSearchJSON = await speciesSearch.json();
            result.species = await speciesSearchJSON.name;
            return result;
          }
        })
      );
      return updatedSearchResults;
    } else if (isAxiosOrVanilla === 'axios') {
      const updatedSearchResults = await Promise.all(
        searchResults.map(async (result) => {
          let speciesSearch;
          if (result.species.length === 0) {
            speciesSearch = await axios.get('https://swapi.dev/api/species/1');
            result.species = await speciesSearch.data.name;
            return result;
          } else {
            speciesSearch = await axios.get(result.species[0]);
            result.species = await speciesSearch.data.name;
            return result;
          }
        })
      );
      return updatedSearchResults;
    }
  }

  return (
    <div>
      <h1>Star Wars Characters Search</h1>
      <MethodSelector
        setAxiosOrVanilla={setAxiosOrVanilla}
        axiosOrVanilla={isAxiosOrVanilla}
      />
      <InputForm
        onSubmit={handleSearch}
        updateSearchTerm={setSearchTerm}
        currentSearchTerm={searchTerm}
      />
      <SearchNavBar
        onClick={handleSearch}
        previous={searchResults.previous}
        next={searchResults.next}
      />
      <Table searchResults={searchResults.data} />
    </div>
  );
}

export default App;
