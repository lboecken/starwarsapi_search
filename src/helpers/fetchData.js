// async function handleSearch(event) {
//   let response = await fetch(
//     `https://swapi.dev/api/people/?search=${searchTerm}`
//   );
//   let responseJSON = await response.json();
//   props.updateNext(responseJSON.next);
//   props.updatePrevious(responseJSON.previous);
//   console.log(responseJSON);
//   let searchResults = await responseJSON.results;
//   searchResults = await getHomeworld(searchResults);
//   searchResults = await getSpecies(searchResults);
//   console.table(searchResults);
//   props.updateSearchResults(searchResults);
//   console.table(searchResults);
// }

// async function getHomeworld(searchResults) {
//   const updatedSearchResults = await Promise.all(
//     searchResults.map(async (result) => {
//       let planetSearch = await fetch(result.homeworld);
//       let planetSearchJSON = await planetSearch.json();
//       result.homeworld = await planetSearchJSON.name;
//       return result;
//     })
//   );
//   return updatedSearchResults;
// }

// async function getSpecies(searchResults) {
//   const updatedSearchResults = await Promise.all(
//     searchResults.map(async (result) => {
//       let speciesSearch;
//       if (result.species.length === 0) {
//         speciesSearch = await fetch('https://swapi.dev/api/species/1');
//         let speciesSearchJSON = await speciesSearch.json();
//         result.species = await speciesSearchJSON.name;
//         return result;
//       } else {
//         speciesSearch = await fetch(result.species[0]);
//         let speciesSearchJSON = await speciesSearch.json();
//         result.species = await speciesSearchJSON.name;
//         console.table(result);
//         return result;
//       }
//     })
//   );
//   return updatedSearchResults;
// }
