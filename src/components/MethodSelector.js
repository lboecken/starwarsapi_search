import React from 'react';

function MethodSelector(props) {
  function handleAxiosOrVanillaChange(value) {
    props.setAxiosOrVanilla(value);
  }
  return (
    <form>
      <select
        value={props.axiosOrVanilla}
        onChange={(e) => {
          handleAxiosOrVanillaChange(e.target.value);
        }}>
        <option value='axios'>axios</option>
        <option defaultValue='vanilla'>vanilla</option>
      </select>
    </form>
  );
}

export default MethodSelector;
