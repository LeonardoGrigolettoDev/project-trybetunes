import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { reqAPI: [] };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const requisitionApi = await getMusics(`${id}`);
    this.setState({ reqAPI: requisitionApi });
    console.log(requisitionApi);
  }

  render() {
    const { reqAPI } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard reqAPI={ reqAPI } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
  params: PropTypes.string,
  id: PropTypes.string,
};

Album.defaultProps = {
  match: '',
  params: '',
  id: '',
};

export default Album;
