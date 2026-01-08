// src/User.js
import React, { useEffect, useState } from "react";
import { ref, get, push, set, update } from "firebase/database";
import { db } from "./firebaseConfig";
import { Container, Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import Header from "./Header";

const User = () => {
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [formValues, setFormValues] = useState({ username: "", email: "" });

  // Fetch all profiles from Firebase
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(db, "users"));
        setProfiles(snapshot.val() || {});
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Open modal for Add/Edit
  const openModal = (userId = null) => {
    setEditUserId(userId);
    if (userId && profiles[userId]?.profile) {
      setFormValues(profiles[userId].profile);
    } else {
      setFormValues({ username: "", email: "" });
    }
    setShowModal(true);
  };

  // Handle Add/Edit form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUserId) {
        // Update existing profile
        await update(ref(db, `users/${editUserId}/profile`), formValues);
        setProfiles((prev) => ({
          ...prev,
          [editUserId]: { profile: formValues },
        }));
      } else {
        // Add new profile
        const newUserRef = push(ref(db, "users"));
        await set(ref(db, `users/${newUserRef.key}/profile`), formValues);
        setProfiles((prev) => ({
          ...prev,
          [newUserRef.key]: { profile: formValues },
        }));
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  // Handle Delete
  const handleDelete = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await set(ref(db, `users/${uid}`), null);
      setProfiles((prev) => {
        const updated = { ...prev };
        delete updated[uid];
        return updated;
      });
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User Profiles</h2>
          <Button variant="success" onClick={() => openModal()}>
            + Add Profile
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : Object.keys(profiles).length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No profiles found
                </td>
              </tr>
            ) : (
              Object.entries(profiles).map(([uid, user], index) => (
                <tr key={uid}>
                  <td>{index + 1}</td>
                  <td>{user.profile?.username || "N/A"}</td>
                  <td>{user.profile?.email || "N/A"}</td>
                  <td className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => openModal(uid)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(uid)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editUserId ? "Edit Profile" : "Add New Profile"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formValues.username}
                onChange={(e) =>
                  setFormValues({ ...formValues, username: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editUserId ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default User;
