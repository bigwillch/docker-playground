import React from 'react';
import PropTypes from 'prop-types';
import Image from 'Presentational/Image'

const Character = (props) => {

  return (
    <div className="card">
      <h2>{ props.name }</h2>
      { props.img &&
        <Image src={ props.img } />
      }
    </div>
  )
}

Character.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string
}

export default Character
