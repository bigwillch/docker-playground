import React, { Component } from 'react'
import { Query } from "react-apollo";
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

class CharacterList extends Component {

  state = {
    filter: null,
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <input
            type='text'
            placeholder='Search for...'
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
          {/* <button onClick={this.clearSearch}>Clear</button> */}
        </div>

        <Query
          query={GET_CHARACTERS}
          variables={{ name: this.state.filter}}
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
      </React.Fragment>
    )
  }
}

export default CharacterList