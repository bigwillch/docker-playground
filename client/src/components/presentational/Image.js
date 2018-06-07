import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = (props) => {
  const image = props
  return (
    <LazyLoadImage
      src={image.src}
      alt={image.alt ? image.alt : null}
      height={image.height ? image.height : null}
      width={image.width ? image.width : null}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

export default Image