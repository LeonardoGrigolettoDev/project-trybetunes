import React from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../pages/Components/LoadingComponent';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  async componentDidMount() {
    const result = await getUser();
    this.setState({
      loading: false,
      name: result.name,
    });
  }

  render() {
    const { loading, name } = this.state;
    if (loading === true) {
      return <LoadingComponent />;
    }
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          Olá
          {' '}
          {name}
        </h1>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
