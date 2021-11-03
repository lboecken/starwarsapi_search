import React from 'react';

function InputForm(props) {
  function handleChangeSearchTerm(value) {
    props.updateSearchTerm(value);
  }

  function handleAxiosOrVanillaChange(value) {
    props.setAxiosOrVanilla(value);
  }

  return (
    <form
      className='d-inline'
      onSubmit={(e) => {
        props.onSubmit(
          e,
          `https://swapi.dev/api/people/?search=${props.currentSearchTerm}`
        );
      }}>
      <select
        className='col-1'
        value={props.axiosOrVanilla}
        onChange={(e) => {
          handleAxiosOrVanillaChange(e.target.value);
        }}>
        <option value='axios'>axios</option>
        <option defaultValue='vanilla'>vanilla</option>
      </select>
      <input
        className='col-5 mx-2'
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
