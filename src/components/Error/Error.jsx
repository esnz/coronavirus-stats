import React from 'react';
import './Error.styles.scss';

const Error = ({retryCallback}) => {
  return (
    <div className="error-backdrop">
      <h2 className="error mb-4">Failed to load data!</h2>
      <button onClick={retryCallback.bind(this)}>Try again</button>
    </div>
  );
};
export default Error;
