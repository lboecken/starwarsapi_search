import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Table from './components/Table';
import SearchNavBar from './components/SearchNavBar';

function App() {
  const [searchResults, setSearchResults] = useState({
    next: null,
    previous: null,
    data: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAxiosOrVanilla, setAxiosOrVanilla] = useState('axios');
  const axios = require('axios');

  useEffect(() => {
    querySWAPI();
  }, []);

  async function querySWAPI(
    event = null,
    url = 'https://swapi.dev/api/people/?search='
  ) {
    try {
      event && event.preventDefault();
      let response, searchResultsData, nextPageURL, previousPageURL;
      if (isAxiosOrVanilla === 'vanilla') {
        response = await fetch(url);
        response = await response.json();
        searchResultsData = await response.results;
        searchResultsData = await getHomeworld(searchResultsData);
        searchResultsData = await getSpecies(searchResultsData);
        console.table(searchResultsData);
        nextPageURL = response.next;
        previousPageURL = response.previous;
      }
      if (isAxiosOrVanilla === 'axios') {
        response = await axios.get(url);
        searchResultsData = await response.data.results;
        searchResultsData = await getHomeworld(searchResultsData);
        searchResultsData = await getSpecies(searchResultsData);
        nextPageURL = response.data.next;
        previousPageURL = response.data.previous;
      }

      setSearchResults({
        next: nextPageURL,
        previous: previousPageURL,
        data: searchResultsData,
      });
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
    }
    if (isAxiosOrVanilla === 'axios') {
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
    if (isAxiosOrVanilla === 'axios') {
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
    <div className='container'>
      <div className='row justify-content-center mt-4'>
        <h1 className='col-10 text-center'>Star Wars Characters Search</h1>
      </div>
      <InputForm
        className='col-6 d-inline'
        onSubmit={querySWAPI}
        updateSearchTerm={setSearchTerm}
        currentSearchTerm={searchTerm}
        setAxiosOrVanilla={setAxiosOrVanilla}
        axiosOrVanilla={isAxiosOrVanilla}
      />
      <Table searchResults={searchResults.data} />
      <SearchNavBar
        onClick={querySWAPI}
        previous={searchResults.previous}
        next={searchResults.next}
      />
    </div>
  );
}

export default App;
