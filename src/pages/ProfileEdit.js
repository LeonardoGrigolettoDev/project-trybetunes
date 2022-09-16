import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingComponent from './Components/LoadingComponent';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // userInfos: [],
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos = async () => {
    // this.setState({ loading: true });
    // const userInfos = await getUser();
    // this.setState({ loading: false, userInfos });
  };

  render() {
    console.log(getUser());
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading === true ? <LoadingComponent />
          : <div />}
      </div>
    );
  }
}

export default ProfileEdit;
