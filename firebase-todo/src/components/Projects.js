// FILE: src/components/Projects.js
// FILE: src/components/Projects.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const projectsRef = collection(db, "users", userId, "projects");
    const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [userId]);

  const addProject = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addDoc(collection(db, "users", userId, "projects"), { name: name.trim(), createdAt: serverTimestamp() });
    setName("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", userId, "projects", id));
  };

  const handleEdit = async (project, newName) => {
    if (!newName.trim()) return;
    await updateDoc(doc(db, "users", userId, "projects", project.id), { name: newName.trim() });
  };

  return (
    <div style={styles.container}>
      <h2>Your Projects</h2>
      <form onSubmit={addProject} style={styles.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create</button>
      </form>

      <ul style={styles.list}>
        {projects.map((p) => (
          <li key={p.id} style={styles.listItem}>
            <EditableText text={p.name} onSave={(newName) => handleEdit(p, newName)} />
            <button style={styles.deleteButton} onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditableText({ text, onSave }) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(text);

  const handleBlur = () => {
    if (value !== text) onSave(value);
    setEditing(false);
  };

  return editing ? (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
      style={{ ...styles.input, flex: 1 }}
    />
  ) : (
    <span onClick={() => setEditing(true)} style={{ cursor: "pointer", flex: 1 }}>
      {text}
    </span>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "30px auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1em" },
  button: { padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#646cff", color: "#fff", cursor: "pointer", fontWeight: "bold" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  deleteButton: { padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#de5246", color: "#fff", cursor: "pointer" },
};


// FILE: src/components/Projects.js