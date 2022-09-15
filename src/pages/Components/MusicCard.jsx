import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import LoadingComponent from './LoadingComponent';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const reqFavoriteSongs = async () => getFavoriteSongs();
    console.log(reqFavoriteSongs);
    const { reqAPI } = this.props;
    const { loading } = this.state;
    console.log(reqAPI);
    if (loading === false) {
      return (
        <div>
          {
            reqAPI.length !== 0
            && (
              <div>
                <h3 data-testid="album-name">{reqAPI[0].collectionName}</h3>
                <p data-testid="artist-name">{reqAPI[0].artistName}</p>
              </div>)
          }
          {reqAPI.map((element, index) => (
            element.kind === 'song'
            && (
              <div key={ index }>
                <p>{element.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ element.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favoriteCheckbox">
                  Favorita
                  <input
                  // getFavorites
                    type="checkbox"
                    name="favoriteCheckbox"
                    onChange={ async () => {
                      this.setState({ loading: true });
                      await addSong(element);
                      this.setState({ loading: false });
                    // mentoria
                    } }
                    data-testid={ `checkbox-music-${element.trackId}` }
                  />
                </label>
              </div>)
          ))}
        </div>
      );
    }
    return <LoadingComponent />;
  }
}

MusicCard.propTypes = {
  reqAPI: PropTypes.string,
};

MusicCard.defaultProps = {
  reqAPI: '',
};
