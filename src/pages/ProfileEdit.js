import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingComponent from './Components/LoadingComponent';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      newName: '',
      newEmail: '',
      newDescription: '',
      newImg: '',
      disabledButton: true,
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos = async () => {
    this.setState({ loading: true });
    const userInfos = await getUser();
    this.setState({ loading: false });
    this.setState({
      newName: userInfos.name,
      newEmail: userInfos.email,
      newDescription: userInfos.description,
      newImg: userInfos.image,
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    this.isSaveButtonDisabled();
  };

  handleClick = () => {
    const { newName, newEmail, newDescription, newImg } = this.state;
    updateUser({
      name: newName,
      email: newEmail,
      image: newImg,
      description: newDescription,
    });
  };

  isSaveButtonDisabled = () => {
    const { newName, newEmail, newDescription } = this.state;
    if (newName.length > 0 && newEmail.length > 0
      && newDescription.length > 0) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  render() {
    const { loading, newName, newEmail,
      newDescription, newImg, disabledButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading === true ? <LoadingComponent />
          : (
            <div>
              <input
                type="text"
                data-testid="edit-input-image"
                id="newImg"
                onChange={ this.handleChange }
              />
              <img src={ newImg } alt="user" />
              <input
                type="text"
                data-testid="edit-input-name"
                id="newName"
                value={ newName }
                onChange={ this.handleChange }
              />
              <input
                type="email"
                data-testid="edit-input-email"
                id="newEmail"
                value={ newEmail }
                onChange={ this.handleChange }
              />
              <input
                type="text"
                id="newDescription"
                data-testid="edit-input-description"
                value={ newDescription }
                onChange={ this.handleChange }
              />
              <Link to="/profile">
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  onClick={ this.handleClick }
                  disabled={ disabledButton }
                >
                  Salvar
                </button>
              </Link>
            </div>)}
      </div>
    );
  }
}

export default ProfileEdit;
