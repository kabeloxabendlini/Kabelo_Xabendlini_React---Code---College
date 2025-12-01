import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';
import { withRouter } from "./withRouter";
import './Github.css';
import 'App.css';
import 'Github.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';

export default function GitHub() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const res = await axios.get(`https://api.github.com/search/users?q=${encodedTerm}`);
      setData(res.data.items);
    } catch (err) {
      console.error(err);
      setError('Error fetching GitHub users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div>
    <Form className="d-flex mb-4" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Enter GitHub username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="me-2"
      />
      <Button type="submit" variant="dark">
        Search
      </Button>
    </Form>

    {isLoading && (
      <div className="text-center my-4">
        <ClipLoader size={60} />
      </div>
    )}

    {error && <p className="text-danger">{error}</p>}

    <div className="user-grid">
      {data.length > 0 ? (
        data.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <h5>{user.login}</h5>
            <Link to={`/github/user/${user.login}/${user.id}`}>
              <Button variant="primary" className="repo-btn">
                View Repos
              </Button>
            </Link>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  </div>
);
}