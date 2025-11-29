import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const GitHub = () => {
  const [username, setUsername] = useState('');
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRepoData(null);

    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('User not found');

      const data = await response.json();
      setRepoData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>GitHub Repository Lookup</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="github-username" className="mb-3">
          <Form.Label>GitHub Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Fetch Repositories
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {repoData && (
        <div className="mt-4">
          <h4>Repositories:</h4>
          <ul>
            {repoData.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHub;
