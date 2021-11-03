import React from 'react';

function SearchNavBar(props) {
  return (
    <div className='wrapper text-center'>
      <div className='btn-group text-center'>
        <button
          className='mx-2'
          onClick={() => {
            props.onClick(null, props.previous);
          }}>
          Previous
        </button>

        <button
          className='mx-2'
          onClick={() => {
            props.onClick(null, props.next);
          }}>
          Next
        </button>
      </div>
    </div>
  );
}
export default SearchNavBar;
