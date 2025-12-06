import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import { withRouter } from './withRouter';   // <-- import wrapper

class GitHubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      isLoading: false,
      error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchUserRepos();
  }

  fetchUserRepos() {
    const { login } = this.props.router.params;
    const encodedLogin = encodeURIComponent(login);

    this.setState({ isLoading: true, error: null });

    axios
      .get(`https://api.github.com/users/${encodedLogin}/repos`)
      .then(res => {
        this.setState({
          repos: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false,
          error: 'Could not fetch repositories.',
        });
      });
  }

  handleClick() {
    this.props.router.navigate('/github');
  }

  render() {
    const { login, id } = this.props.router.params;
    const { repos, isLoading, error } = this.state;

    return (
      <div className="container">
        <h1 className="mb-2">GitHub User: {login}</h1>
        <h2 className="mb-4">ID: {id}</h2>

        <Button variant="secondary" onClick={this.handleClick} className="mb-4">
          ← Back to Users
        </Button>

        {isLoading && <p>Loading repositories...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!isLoading && !error && repos.length === 0 && (
          <p>No repositories found.</p>
        )}

        <div className="repo-grid">
          {repos.map(repo => (
            <div key={repo.id} className="repo-card">
              <h5>{repo.name}</h5>
              <p>{repo.description || 'No description provided.'}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <button>View on GitHub</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(GitHubUser);
