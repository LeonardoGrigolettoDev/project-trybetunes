import React from 'react';
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
        <p data-testid="header-user-name">
          Olá
          {' '}
          {name}
        </p>
      </header>
    );
  }
}

export default Header;
