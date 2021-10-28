import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Table from './components/Table';
import SearchNavBar from './components/SearchNavBar';
import MethodSelector from './components/MethodSelector';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [nextSearch, setNextSearch] = useState();
  const [previousSearch, setPreviousSearch] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [isAxiosOrVanilla, setAxiosOrVanilla] = useState('vanilla');
  const axios = require('axios');

  useEffect(() => {
    handleSearchVanilla();
  }, []);

  async function handleSearchVanilla(
    event = null,
    url = 'https://swapi.dev/api/people/?search='
  ) {
    try {
      event && event.preventDefault();
      let response = await fetch(url);
      let responseJSON = await response.json();
      let searchResults = await responseJSON.results;
      searchResults = await getHomeworldVanilla(searchResults);
      searchResults = await getSpeciesVanilla(searchResults);
      setNextSearch(responseJSON.next);
      setPreviousSearch(responseJSON.previous);
      setSearchResults(searchResults);
    } catch (e) {
      console.log(e);
    }
  }

  async function getHomeworldVanilla(searchResults) {
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

  async function getSpeciesVanilla(searchResults) {
    const updatedSearchResults = await Promise.all(
      searchResults.map(async (result) => {
        let speciesSearch;
        if (result.species.length === 0) {
          speciesSearch = await fetch('https://swapi.dev/api/species/1');
          let speciesSearchJSON = await speciesSearch.json();
          result.species = await speciesSearchJSON.name;
          return result;
        } else {
          speciesSearch = await fetch(result.species[0]);
          let speciesSearchJSON = await speciesSearch.json();
          result.species = await speciesSearchJSON.name;
          return result;
        }
      })
    );
    return updatedSearchResults;
  }

  async function handleSearchAxios(
    event = null,
    url = 'https://swapi.dev/api/people/?search='
  ) {
    try {
      event && event.preventDefault();
      let response = await axios.get(url);
      let searchResults = await response.data.results;
      searchResults = await getHomeworldAxios(searchResults);
      searchResults = await getSpeciesAxios(searchResults);
      setNextSearch(response.data.next);
      setPreviousSearch(response.data.previous);
      setSearchResults(searchResults);
    } catch (e) {
      console.log(e);
    }
  }

  async function getHomeworldAxios(searchResults) {
    const updatedSearchResults = await Promise.all(
      searchResults.map(async (result) => {
        let planetSearch = await axios.get(result.homeworld);
        console.table(planetSearch);
        result.homeworld = planetSearch.data.name;
        return result;
      })
    );
    return updatedSearchResults;
  }

  async function getSpeciesAxios(searchResults) {
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

  return (
    <div>
      <h1>testing SWAPI</h1>
      <MethodSelector
        setAxiosOrVanilla={setAxiosOrVanilla}
        axiosOrVanilla={isAxiosOrVanilla}
      />
      <InputForm
        axiosOrVanilla={isAxiosOrVanilla}
        updateSearchResults={setSearchResults}
        updateNext={setNextSearch}
        updatePrevious={setPreviousSearch}
        onSubmitVanilla={handleSearchVanilla}
        onSubmitAxios={handleSearchAxios}
        updateSearchTerm={setSearchTerm}
        currentSearchTerm={searchTerm}
      />
      <SearchNavBar
        isAxiosOrVanilla={isAxiosOrVanilla}
        onClickVanilla={handleSearchVanilla}
        onClickAxios={handleSearchAxios}
        previous={previousSearch}
        next={nextSearch}
      />
      <Table searchResults={searchResults} />
    </div>
  );
}

export default App;
