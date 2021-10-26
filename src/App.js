import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Table from './components/Table';
import SearchNavBar from './components/SearchNavBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextSearch, setNextSearch] = useState(null);
  const [previousSearch, setPreviousSearch] = useState(null);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    async function initSearchResults() {
      let response = await fetch(`https://swapi.dev/api/people/`);
      let responseJSON = await response.json();
      setNextSearch(responseJSON.next);
      let searchResults = await responseJSON.results;
      console.log(typeof searchResults, searchResults);
      searchResults = await getHomeworld(searchResults);
      searchResults = await getSpecies(searchResults);
      setSearchResults(searchResults);
    }
    initSearchResults();
  }, []);

  // Want to extract these but for prototyping this will do
  async function handleSearch(event) {
    event.preventDefault();
    let response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    console.log(response);
    let responseJSON = await response.json();
    setNextSearch(responseJSON.next);
    setPreviousSearch(responseJSON.previous);
    let searchResults = await responseJSON.results;
    searchResults = await getHomeworld(searchResults);
    searchResults = await getSpecies(searchResults);
    console.table(searchResults);
    setSearchResults(searchResults);
    console.table(searchResults);
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

  return (
    <div>
      <h1>testing SWAPI</h1>
      <InputForm
        updateSearchResults={setSearchResults}
        updateNext={setNextSearch}
        updatePrevious={setPreviousSearch}
        onSubmit={handleSearch}
        updateSearchTerm={setSearchTerm}
        currentSearchTerm={searchTerm}
      />
      <SearchNavBar />
      <Table
        searchResults={searchResults}
        setIsLoading={setIsLoading}
        loadings={isLoading}
      />
    </div>
  );
}

export default App;
