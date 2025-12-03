// src/User.js
import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { db } from "./firebaseConfig"; // Ensure db is exported from firebaseConfig.js
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import "./User.css"; // We'll style it here

function User() {
  const [users, setUsers] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await get(ref(db, "/"));
      const data = snapshot.val();
      if (data) {
        const userList = Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }));
        setUsers(userList);
      }
    };
    fetchUsers();
  }, []);

  const handleAdd = () => navigate("/add");

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await remove(ref(db, "/" + selectedUser.key));
      setUsers(users.filter((u) => u.key !== selectedUser.key));
      setShowDeleteDialog(false);
    } catch (error) {
      alert("Could not delete user.");
      console.error(error);
    }
  };

  return (
    <div className="users-container">
      <div className="header-section">
        <h1 className="users-title">User Management</h1>
        <Button className="add-button" onClick={handleAdd}>
          + Add User
        </Button>
      </div>

      <Table striped hover bordered responsive className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit/${user.key}`} className="edit-link">
                    Edit
                  </Link>
                </td>
                <td>
                  <Button
                    className="delete-button"
                    onClick={() => openDeleteDialog(user)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedUser.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default User;
