import React from 'react';

function SearchNavBar(props) {
  return (
    <ul>
      <li>
        <button
          onClick={() => {
            props.onClick(null, props.previous);
          }}>
          Previous
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            props.onClick(null, props.next);
          }}>
          Next
        </button>
      </li>
    </ul>
  );
}
export default SearchNavBar;
