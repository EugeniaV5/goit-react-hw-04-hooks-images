import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <button type="Button" onClick={onLoadMoreClick} className="Button">
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
