import React from 'react';

function InputForm(props) {
  function handleChangeSearchTerm(value) {
    props.updateSearchTerm(value);
  }

  return (
    <form
      onSubmit={(e) => {
        props.onSubmit(e, 'newSearch');
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
