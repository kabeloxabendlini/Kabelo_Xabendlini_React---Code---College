import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';

class App extends Component {
  render() {
    return <Header />;
  }
}

export default App;

class Header extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">React-Redux GitHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/github">GitHub</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/github/user/:login/:id" element={<GitHubUser />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to React-Redux GitHub Search</h2>
        <p>Use the GitHub menu to search for users.</p>
      </div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>404 - Page Not Found</h2>
        <p>The page you requested does not exist.</p>
      </div>
    );
  }
}
