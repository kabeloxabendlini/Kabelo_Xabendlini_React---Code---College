// src/User.js
import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Modal } from "react-bootstrap";

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users
  useEffect(() => {
    const usersRef = ref(db, "/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUsers(data);
    });
  }, []);

  // Delete user
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteUser = async () => {
    await remove(ref(db, "/" + userToDelete));
    setShowDeleteModal(false);
  };

  return (
    <Container className="mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">User Management</h1>

        <Button variant="success" className="px-4 py-2 shadow"
          onClick={() => navigate("/add-user")}
        >
          + Add User
        </Button>
      </div>

      {/* Users Table */}
      <div className="p-4 shadow-lg rounded bg-white">
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(users).length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              Object.entries(users).map(([id, user], index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => navigate(`/edit-user/${id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="fs-5">Are you sure you want to delete this user?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User;
