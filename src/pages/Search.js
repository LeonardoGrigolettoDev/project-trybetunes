import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitButtonDisabled: true,
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const numberOfCarac = 2;
    this.setState({ artist: event.target.value });
    if (event.target.value.length >= numberOfCarac) {
      this.setState({ isSubmitButtonDisabled: false });
    } else {
      this.setState({ isSubmitButtonDisabled: true });
    }
  };

  render() {
    const { artist, isSubmitButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="input-search">
          <input
            type="text"
            name="input-search"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ this.handleChange }
            value={ artist }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isSubmitButtonDisabled }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

export default Search;
