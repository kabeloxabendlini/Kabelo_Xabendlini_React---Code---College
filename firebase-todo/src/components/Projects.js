// src/components/Projects.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, "projects"), where("uid", "==", auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (!name.trim()) return;

    await addDoc(collection(db, "projects"), {
      name: name.trim(),
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });
    setName("");
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <form onSubmit={addProject}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
        <button type="submit">Create</button>
      </form>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
// FILE: src/components/Projects.js