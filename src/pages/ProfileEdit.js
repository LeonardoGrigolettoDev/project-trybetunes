import React from 'react';
import PropTypes from 'prop-types';
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
    }, () => this.isSaveButtonDisabled());
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    this.isSaveButtonDisabled();
  };

  handleClick = async () => {
    const { newName, newEmail, newDescription, newImg } = this.state;
    await updateUser({
      name: newName,
      email: newEmail,
      image: newImg,
      description: newDescription,
    });
    const { history } = this.props;
    history.push('/profile');
  };

  isSaveButtonDisabled = () => {
    const { newName, newEmail, newDescription, newImg } = this.state;
    let validationEmail = false;
    if (newEmail.includes('@')) validationEmail = true;
    if (newName && newDescription && validationEmail && newImg) {
      this.setState({ disabledButton: false });
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
                value={ newImg }
                onChange={ this.handleChange }
              />
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
              <button
                data-testid="edit-button-save"
                type="submit"
                onClick={ this.handleClick }
                disabled={ disabledButton }
              >
                Editar perfil
              </button>
            </div>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};

export default ProfileEdit;
