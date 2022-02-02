import React from 'react';
import './ImageGalleryItem.css';

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  picture,
  tags,
  largeImageURL,
  onOpenImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={picture}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => {
          onOpenImage(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func.isRequired,
};
