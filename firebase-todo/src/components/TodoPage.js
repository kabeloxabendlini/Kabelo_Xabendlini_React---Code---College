// FILE: src/components/TodoPage.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import AddTodo from "./AddTodo";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "users", userId, "todos"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [userId]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", userId, "todos", id));
  };

  return (
    <div style={styles.container}>
      <h2>{auth.currentUser?.email}'s Todos</h2>
      <AddTodo />
      <ul style={styles.list}>
        {todos.map((t) => (
          <li key={t.id} style={styles.listItem}>
            {t.text}
            <button style={styles.deleteButton} onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "30px auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" },
  deleteButton: { padding: "5px 10px", borderRadius: "5px", border: "none", backgroundColor: "#de5246", color: "#fff", cursor: "pointer" },
};

// FILE: src/components/TodoPage.js