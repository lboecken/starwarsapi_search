import React from 'react';

function InputForm(props) {
  function handleChangeSearchTerm(value) {
    props.updateSearchTerm(value);
  }

  return (
    <form
      onSubmit={(e) => {
        props.onSubmit(
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

export default InputForm;
