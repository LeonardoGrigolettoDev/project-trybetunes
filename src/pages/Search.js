import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import LoadingComponent from './Components/LoadingComponent';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitButtonDisabled: true,
      artist: '',
      xablau: '',
      loading: false,
      requestResult: [],
      requested: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ loading: true, xablau: artist });
    const result = await searchAlbumAPI(artist);
    this.setState({ requestResult: result });
    this.setState({ loading: false, requested: true, artist: '' });
  };

  render() {
    const { artist, isSubmitButtonDisabled,
      loading, requestResult,
      requested, xablau } = this.state;
    if (loading === true) {
      return (
        <>
          <Header />
          <LoadingComponent />
        </>
      );
    }
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </label>
        {requestResult.length !== 0
          && <p>{`Resultado de álbuns de: ${xablau}`}</p>}
        {requestResult.length !== 0 && requestResult.map((element, index) => (
          <Link
            to={ `/album/${element.collectionId}` }
            key={ index }
            data-testid={ `link-to-album-${element.collectionId}` }
          >
            <div>
              <p>{element.artistName}</p>
              <img src={ element.artworkUrl100 } alt="artist artwork" />
              <p>{element.collectionName}</p>
            </div>
          </Link>
        ))}
        {requestResult.length === 0
        && requested === true
        && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
