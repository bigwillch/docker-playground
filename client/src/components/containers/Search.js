import React, { Component } from 'react'

import CharacterList from 'Containers/CharacterList'

class Search extends Component {
  state = {
   filter: null,
  }

  clearSearch = () => {
    this.search.value = ''
    this.setState({
      filter: this.search.value
    })
  }

  handleInputChange = () => {
    this.setState({
      filter: this.search.value
    })
  }

  // handleInputChange = () => {
  //   this.setState({
  //     filter: this.search.value
  //   }, () => {
  //     if (this.state.filter) {
  //       this.props.onChange({...this.props.params, [this.props.filter]: this.state.filter}, this.props.endpoint);
  //     } else {
  //       this.clearSearch();
  //     }
  //   })
  // }

  render() {
   return (
    <React.Fragment>
      <div>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <button onClick={ this.clearSearch }>Clear</button>
      </div>
      <CharacterList
        name={this.state.filter}
      />
    </React.Fragment>
   )
  }
}

export default Search
