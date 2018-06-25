import React from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Character from 'Presentational/Character'

const GET_CHARACTERS = gql`
  query SearchCharacters($name: String) {
    characters(name: $name) {
      name
      img
    }
  }
`

const CharacterList = (props) => {
  const { data: { loading, error, characters } } = props;
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return characters.map((item, index) =>
    <Character
      key={index}
      name={item.name}
      img={item.img}
    />
  );
}

export default graphql(
  GET_CHARACTERS, {
  options: (props) => ({
    variables: {
      name: props.name
    },
  }),
}
)(CharacterList);