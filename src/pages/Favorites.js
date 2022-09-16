import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingComponent from './Components/LoadingComponent';
import MusicCard from './Components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    let favorites = '';
    const meAjuda = async () => { favorites = await getFavoriteSongs(); };
    meAjuda();
    this.setState({ favoriteSongs: favorites });
    this.setState({ loading: false });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading === true
            ? <LoadingComponent /> : (<MusicCard reqAPI={ favoriteSongs } />)
        }

      </div>
    );
  }
}

export default Favorites;
