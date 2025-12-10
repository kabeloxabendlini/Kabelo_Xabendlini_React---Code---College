// FILE: src/components/TodoPage.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TodoPage() {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "todos"),
      where("uid", "==", user.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    await addDoc(collection(db, "todos"), {
      uid: user.uid,
      text: newTodo,
      createdAt: serverTimestamp(),
    });
    setNewTodo("");
  };

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  if (!user) return <p>Please log in to view your todos.</p>;

  return (
    <div>
      <h1>{user.displayName || user.email}'s Todos</h1>
      <input
        type="text"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
        autoComplete="email"  // add autocomplete