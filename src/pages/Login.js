import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingComponent from './Components/LoadingComponent';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.createUserLoading = this.createUserLoading.bind(this);
    this.state = {
      isButtonDisabled: true,
      name: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    const numberOfLetters = 3;
    if (event.target.value.length >= numberOfLetters) {
      this.setState({ isButtonDisabled: false,
        name: event.target.value,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
        name: event.target.value,
      });
    }
  };

  createUserLoading = async (name) => {
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { isButtonDisabled, name, loading } = this.state;
    console.log(this.props);
    if (loading === true) {
      return <LoadingComponent />;
    }
    return (
      <div data-testid="page-login">
        <label htmlFor="input-name">
          Login
          <input
            type="text"
            data-testid="login-name-input"
            name="input-name"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ () => {
              this.createUserLoading(name);
            } }
          >
            Entrar
          </button>

        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
