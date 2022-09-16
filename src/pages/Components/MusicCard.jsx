import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import LoadingComponent from './LoadingComponent';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritedSongs: [],
    };
  }

  reqFavoriteSongs = async () => {
    const req = await getFavoriteSongs();
    this.setState({ favoritedSongs: req });
  };

  // componentDidMount() {
  //   this.reqFavoriteSongs();
  // }

  render() {
    const { reqAPI } = this.props;
    const { loading, favoritedSongs } = this.state;
    const favoritedSongsOnStr = favoritedSongs.map((element) => JSON.stringify(element));
    this.reqFavoriteSongs();
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
                    onChange={ async (event) => {
                      if (event.target.checked === false) {
                        this.setState({ loading: true });
                        await removeSong(element);
                        this.setState({ loading: false });
                      } else {
                        const test = favoritedSongsOnStr;
                        if (test.includes(JSON.stringify(element))) {
                          test.push(element);
                        }
                        this.setState({ favoritedSongs: test });
                        this.setState({ loading: true });
                        await addSong(element);
                        this.setState({ loading: false });
                      }
                    } }
                    checked={ favoritedSongsOnStr.includes(JSON.stringify(element)) }
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
