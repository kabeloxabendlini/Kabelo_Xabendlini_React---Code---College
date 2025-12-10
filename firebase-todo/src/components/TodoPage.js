// FILE: src/components/TodoPage.js
// src/components/TodoPage.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("uid", "==", auth.currentUser?.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return unsubscribe;
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    await addDoc(collection(db, "todos"), {
      text: newTodo,
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <h2>Your Todos</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
