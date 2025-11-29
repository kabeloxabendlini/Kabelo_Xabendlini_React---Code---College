import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// Wrapper to inject params and navigate into class component
function withRouter(Component) {
  return props => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  };
}

class GitHubUser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // navigate back to /github
    this.props.navigate('/github');
  }

  render() {
    const { login, id } = this.props.params;

    return (
      <div>
        <h1>User Login: {login}</h1>
        <h2>User Id: {id}</h2>
        <Button variant="primary" onClick={this.handleClick}>
          Go to GitHub Users
        </Button>
      </div>
    );
  }
}

export default withRouter(GitHubUser);
