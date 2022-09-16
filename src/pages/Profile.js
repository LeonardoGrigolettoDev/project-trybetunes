import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingComponent from './Components/LoadingComponent';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.thisUser();
  }

  thisUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading === true ? <LoadingComponent />
          : (
            <div>
              <h2>{user.name}</h2>
              <label htmlFor="name">
                {' '}
                Nome
                <p name="name">{user.name}</p>
              </label>
              <label htmlFor="email">
                {' '}
                Email
                <p name="email">{user.email}</p>
              </label>
              <label htmlFor="description">
                {' '}
                Descrição
                <p name="description">{user.description}</p>
              </label>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="alt userIMG"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
