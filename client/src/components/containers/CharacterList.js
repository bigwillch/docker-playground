import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Character from 'Presentational/Character'

const CharacterList = () => (
  <Query
    query={gql`
      {
        characters {
          name
          img
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const chars = data.characters.map((item, index) =>
        <Character
          key={index}
          name={item.name}
          img={item.img}
        />
      );

      return (
        <React.Fragment>
          {chars.length > 0 &&
            chars
          }
        </React.Fragment>
      );
    }}
  </Query>
);

export default CharacterList