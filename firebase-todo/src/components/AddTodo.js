// FILE: src/components/AddTodo.js
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTodo() {
  const [text, setText] = useState("");

  const add = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Please sign in");
    if (!text.trim()) return;

    const todosRef = collection(db, "users", auth.currentUser.uid, "todos");
    await addDoc(todosRef, {
      text: text.trim(),
      completed: false,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <form onSubmit={add} style={styles.form}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add
      </button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1em" },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#646cff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

// FILE: src/components/AddTodo.js