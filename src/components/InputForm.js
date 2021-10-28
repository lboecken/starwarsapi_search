import React from 'react';

function InputForm(props) {
  function handleChangeSearchTerm(value) {
    props.updateSearchTerm(value);
  }

  if (props.axiosOrVanilla === 'vanilla') {
    return (
      <form
        onSubmit={(e) => {
          props.onSubmitVanilla(
            e,
            `https://swapi.dev/api/people/?search=${props.currentSearchTerm}`
          );
          props.updateNext(null);
          props.updatePrevious(null);
        }}>
        <input
          type='text'
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          placeholder='Search Your favorite Characters here!'
          value={props.currentSearchTerm}
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
  if (props.axiosOrVanilla === 'axios') {
    return (
      <form
        onSubmit={(e) => {
          props.onSubmitAxios(
            e,
            `https://swapi.dev/api/people/?search=${props.currentSearchTerm}`
          );
          props.updateNext(null);
          props.updatePrevious(null);
        }}>
        <input
          type='text'
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          placeholder='Search Your favorite Characters here!'
          value={props.currentSearchTerm}
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default InputForm;
