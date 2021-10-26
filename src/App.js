import React, { useState, useEffect } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import Table from './components/Table';
import SearchNavBar from './components/SearchNavBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [nextSearch, setNextSearch] = useState();
  const [previousSearch, setPreviousSearch] = useState();
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    handleSearch();
  }, []);

  // Want to extract these but for prototyping this will do
  async function handleSearch(
    event = null,
    url = 'https://swapi.dev/api/people/?search='
  ) {
    try {
      event && event.preventDefault();
      let response = await fetch(url);
      let responseJSON = await response.json();
      console.log(responseJSON);
      let searchResults = await responseJSON.results;
      searchResults = await getHomeworld(searchResults);
      searchResults = await getSpecies(searchResults);
      setNextSearch(responseJSON.next);
      setPreviousSearch(responseJSON.previous);
      setSearchResults(searchResults);
    } catch (e) {
      console.log(e);
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
      <SearchNavBar
        onClick={handleSearch}
        previous={previousSearch}
        next={nextSearch}
      />
      <Table searchResults={searchResults} />
    </div>
  );
}

export default App;
