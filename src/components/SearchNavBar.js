import React from 'react';

function SearchNavBar(props) {
  if (props.isAxiosOrVanilla === 'vanilla') {
    return (
      <ul>
        <li>
          <button
            onClick={() => {
              props.onClickVanilla(null, props.previous);
            }}>
            Previous
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onClickVanilla(null, props.next);
            }}>
            Next
          </button>
        </li>
      </ul>
    );
  }

  if (props.isAxiosOrVanilla === 'axios') {
    return (
      <ul>
        <li>
          <button
            onClick={() => {
              props.onClickAxios(null, props.previous);
            }}>
            Previous
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onClickAxios(null, props.next);
            }}>
            Next
          </button>
        </li>
      </ul>
    );
  }
}

export default SearchNavBar;
