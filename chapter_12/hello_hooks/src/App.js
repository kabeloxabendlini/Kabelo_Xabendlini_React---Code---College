import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Tab, Row, Col, Card, Spinner, Alert, Form } from 'react-bootstrap';
import useFetch from './useFetch';

const App = () => {
  const tabs = {
    Users: "https://jsonplaceholder.typicode.com/users",
    Posts: "https://jsonplaceholder.typicode.com/posts",
    Todos: "https://jsonplaceholder.typicode.com/todos",
  };

  const [activeTab, setActiveTab] = useState('Users');

  const { data, loading, error } = useFetch(tabs[activeTab]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Mini Dashboard</h1>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {Object.keys(tabs).map(tab => (
                <Nav.Item key={tab}>
                  <Nav.Link eventKey={tab}>{tab}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey={activeTab}>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && (
                  <Row xs={1} md={2} lg={3} className="g-3">
                    {data.map(item => (
                      <Col key={item.id}>
                        <Card className="h-100 shadow-sm">
                          <Card.Body>
                            {activeTab === 'Users' && (
                              <>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                  <strong>Email:</strong> {item.email}<br />
                                  <strong>Username:</strong> {item.username}<br />
                                  <strong>Phone:</strong> {item.phone}
                                </Card.Text>
                              </>
                            )}

                            {activeTab === 'Posts' && (
                              <>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.body}</Card.Text>
                              </>
                            )}

                            {activeTab === 'Todos' && (
                              <Form.Check 
                                type="checkbox"
                                label={item.title}
                                checked={item.completed}
                                readOnly
                              />
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default App;
